const EnemyModel = require('../models/enemyModel');

class EnemyController {
    static async getAll(req, res) {
        try {
            const enemy = await EnemyModel.getAll();
            res.status(200).json({
                success: true,
                data: enemy
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data enemy',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const enemy = await EnemyModel.getById(id);
            
            if (!enemy) {
                return res.status(404).json({
                    success: false,
                    message: 'enemy tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                data: enemy
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data enemy',
                error: error.message
            });
        }
    }

    static async create(req, res) {
        try {
            const { nama, dif, health } = req.body;
            
            if (!nama || !dif || !health) {
                return res.status(400).json({
                    success: false,
                    message: 'data harus diisi'
                });
            }
            
            const id = await EnemyModel.create({ nama, dif, health });
            
            res.status(201).json({
                success: true,
                message: 'enemy berhasil ditambahkan',
                data: { id, nama, dif, health }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambah enemy',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const { nama, dif, health } = req.body;
            
            if (!nama || !dif || !health) {
                return res.status(400).json({
                    success: false,
                    message: 'Data harus diisi'
                });
            }
            
            const affectedRows = await EnemyModel.update(id, { nama, dif, health });
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'enemy tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'enemy berhasil diupdate'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengupdate enemy',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            const affectedRows = await EnemyModel.delete(id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'enemy tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'enemy berhasil dihapus'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus enemy',
                error: error.message
            });
        }
    }
}

module.exports = EnemyController;