const express = require('express');
const cors = require('cors');
const scoresRoutes = require('./scores.routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', scoresRoutes);

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));