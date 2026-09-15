const MobModel = require('../models/mobModel');

class MobController {
    static async getAll(req, res) {
        try {
            const mob = await MobModel.getAll();
            res.status(200).json({
                success: true,
                data: mob
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data mob',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const mob = await MobModel.getById(id);
            
            if (!mob) {
                return res.status(404).json({
                    success: false,
                    message: 'mob tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                data: mob
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data mob',
                error: error.message
            });
        }
    }

    static async create(req, res) {
        try {
            const { nama, tipe, health } = req.body;
            
            if (!nama || !tipe || !health) {
                return res.status(400).json({
                    success: false,
                    message: 'data harus diisi'
                });
            }
            
            const id = await MobModel.create({ nama, tipe, health });
            
            res.status(201).json({
                success: true,
                message: 'mob berhasil ditambahkan',
                data: { id, nama, tipe, health }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambah mob',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const { nama, tipe, health } = req.body;
            
            if (!nama || !tipe || !health) {
                return res.status(400).json({
                    success: false,
                    message: 'Data harus diisi'
                });
            }
            
            const affectedRows = await MobModel.update(id, { nama, tipe, health });
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'mob tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'mob berhasil diupdate'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengupdate mob',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            const affectedRows = await MobModel.delete(id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'mob tidak ditemukan'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'mob berhasil dihapus'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus mob',
                error: error.message
            });
        }
    }
}

module.exports = MobController;