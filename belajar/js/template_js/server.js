const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const playerRoutes = require('./routes/playerRoutes');
const mobRoutes = require('./routes/mobRoutes');
const enemyRoutes = require('./routes/enemyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({
        message: 'Server berjalan dengan baik!',
        endpoints: {
            player: '/api/player',
            mob: '/api/mob',
            enemy: '/api/enemy'
        }
    });
});

app.use('/api/player', playerRoutes);

app.use('/api/mob', mobRoutes);

app.use('/api/enemy', enemyRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});