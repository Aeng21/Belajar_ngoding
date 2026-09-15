import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import playerRoutes from './routes/playerRoutes.js';
import mobRoutes from './routes/mobRoutes.js';
import enemyRoutes from './routes/enemyRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files (folder public tetap di root)
app.use(express.static(path.join(__dirname, '../public')));
// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Server berjalan dengan baik!',
        endpoints: {
            player: '/api/player',
            mob: '/api/mob',
            enemy: '/api/enemy',
        },
    });
});
app.use('/api/player', playerRoutes);
app.use('/api/mob', mobRoutes);
app.use('/api/enemy', enemyRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan',
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: err.message,
    });
});
// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
