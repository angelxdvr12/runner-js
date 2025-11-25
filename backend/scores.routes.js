const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data', 'scores.json');

const getScores = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

router.get('/scores', (req, res) => {
    const scores = getScores();
    res.json(scores.slice(0, 10));
});

router.post('/scores', (req, res) => {
    const { nombre, score, nivel } = req.body;
    const scores = getScores();
    scores.push({ nombre, score, nivel, fecha: new Date() });
    scores.sort((a, b) => b.score - a.score); 
    fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2));
    res.json({ success: true });
});

module.exports = router;