const API_URL = 'https://https://runner-api-w8my.onrender.com/api/scores';

async function saveScoreToBackend(nombre, score, nivel) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, score, nivel })
        });
        loadLeaderboard(); 
    } catch (e) {
        console.error("Backend no disponible, guardando local");
        alert("Error de conexión con el servidor. Revisa si 'node server.js' está corriendo.");
    }
}

async function loadLeaderboard() {
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '<li>Cargando...</li>';
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        if (data.length === 0) {
            list.innerHTML = '<li>No hay puntuaciones aún.</li>';
            return;
        }

        list.innerHTML = data.slice(0, 10).map((s, i) => {
            const isTop1 = i === 0;
            const rankIcon = isTop1 ? '🏆 ' : '';
            const itemClass = isTop1 ? 'leaderboard-item top-1' : 'leaderboard-item';
            const date = new Date().toLocaleDateString();

            return `
            <li class="${itemClass}">
                <div class="player-info">
                    <span class="player-rank">${rankIcon}${i + 1}</span>
                    <div>
                        <span class="player-name">${s.nombre}</span>
                        <span class="player-details">Nivel ${s.nivel} • ${date}</span>
                    </div>
                </div>
                <div class="player-score">
                    ${s.score} <span class="score-label">puntos</span>
                </div>
            </li>
            `;
        }).join('');
    } catch (e) {
        list.innerHTML = "<li>No se pudo conectar al servidor.</li>";
    }
}

// Cargar al inicio si se accede directamente con hash #leaderboard
if (window.location.hash === '#leaderboard') {
    document.querySelector('[data-target="leaderboard-section"]').click();
}