import MobModel from '../models/mobModel.js';
class MobController {
    static async getAll(req, res) {
        try {
            const mob = await MobModel.getAll();
            res.status(200).json({
                success: true,
                data: mob,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data mob',
                error: error.message,
            });
        }
    }
    static async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const mob = await MobModel.getById(id);
            if (!mob) {
                res.status(404).json({
                    success: false,
                    message: 'Mob tidak ditemukan',
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: mob,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data mob',
                error: error.message,
            });
        }
    }
    static async create(req, res) {
        try {
            const { nama, tipe, health } = req.body;
            if (!nama || !tipe || !health) {
                res.status(400).json({
                    success: false,
                    message: 'Data harus diisi',
                });
                return;
            }
            const id = await MobModel.create({ nama, tipe, health });
            res.status(201).json({
                success: true,
                message: 'Mob berhasil ditambahkan',
                data: { id, nama, tipe, health },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambah mob',
                error: error.message,
            });
        }
    }
    static async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nama, tipe, health } = req.body;
            if (!nama || !tipe || !health) {
                res.status(400).json({
                    success: false,
                    message: 'Data harus diisi',
                });
                return;
            }
            const affectedRows = await MobModel.update(id, { nama, tipe, health });
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Mob tidak ditemukan',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Mob berhasil diupdate',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengupdate mob',
                error: error.message,
            });
        }
    }
    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            const affectedRows = await MobModel.delete(id);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Mob tidak ditemukan',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Mob berhasil dihapus',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus mob',
                error: error.message,
            });
        }
    }
}
export default MobController;
