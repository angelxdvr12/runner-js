const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startOverlay = document.getElementById('startOverlay');
const gameOverModal = document.getElementById('gameOverModal');
const startBtn = document.getElementById('startBtn');
const highScoreEl = document.getElementById('highScore');

let gameRunning = false;
let gameStarted = false;
let score = 0;
let level = 1;
let animationId;
let highScore = localStorage.getItem('runnerHighScore') || 0;
highScoreEl.innerText = highScore;

const player = { x: 50, y: 350, size: 40, dy: 0, jumpStrength: -12, gravity: 0.6, grounded: true };
let obstacles = [];

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.style.display = 'none');
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).style.display = 'block';
        if (btn.dataset.target === 'leaderboard-section') {
            loadLeaderboard();
        }
    });
});

if(document.querySelector('.tab-btn.active')) {
    document.querySelector('.tab-btn.active').click();
}

startBtn.addEventListener('click', () => {
    startGame();
});

function startGame() {
    if(gameRunning) return;
    startOverlay.classList.add('hidden');
    gameOverModal.classList.add('hidden');
    gameRunning = true;
    gameStarted = true;
    score = 0;
    level = 1;
    obstacles = [];
    player.y = 350;
    player.dy = 0;
    updateHUD();
    animate();
    spawnObstacle();
}

function spawnObstacle() {
    if (!gameRunning) return;
    obstacles.push({ x: canvas.width, size: Math.random() * 20 + 30 });
    setTimeout(spawnObstacle, Math.random() * 1500 + 1000);
}

function animate() {
    if (!gameRunning) return;
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);

    player.dy += player.gravity;
    player.y += player.dy;
    if (player.y > 360) { player.y = 360; player.dy = 0; player.grounded = true; }
    
    ctx.fillStyle = '#f97316';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    obstacles.forEach((obs, i) => {
        obs.x -= (5 + level);
        ctx.fillStyle = '#ef4444'; 
        ctx.fillRect(obs.x, 360 + (40 - obs.size), obs.size, obs.size); 

        if (player.x < obs.x + obs.size && player.x + player.size > obs.x &&
            player.y < 360 + 40 && player.y + player.size > 360 + (40 - obs.size)) {
            gameOver();
        }
        if (obs.x + obs.size < 0) { obstacles.splice(i, 1); score+=10; updateHUD(); }
    });
}

function updateHUD() {
    document.getElementById('score').innerText = score;
    document.getElementById('level').innerText = level;
    if(score % 500 === 0 && score > 0) { level++; }
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    gameOverModal.classList.remove('hidden');
    document.getElementById('finalScore').innerText = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('runnerHighScore', highScore);
        highScoreEl.innerText = highScore;
    }
}

window.resetGame = function() {
    startGame();
}

window.submitScore = function() {
    const name = document.getElementById('playerName').value || "Anon";
    if(window.saveScoreToBackend) saveScoreToBackend(name, score, level);
    resetGame();
    gameRunning = false; 
    document.querySelector('[data-target="leaderboard-section"]').click();
};


function handleJump(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

    if (!gameStarted && !startOverlay.classList.contains('hidden')) {
         startGame();
    } else if(gameRunning && player.grounded) { 
         player.dy = player.jumpStrength; player.grounded = false; 
    }
}

window.addEventListener('keydown', e => {
    if((e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        handleJump(e);
    }
});

window.addEventListener('touchstart', (e) => {
    handleJump(e);
}, { passive: false });

window.addEventListener('mousedown', handleJump);

window.addEventListener('load', () => {
    if (window.location.hash === '#leaderboard') {
        const lbBtn = document.querySelector('[data-target="leaderboard-section"]');
        if (lbBtn) {
            lbBtn.click(); 
        }
    }
});