import { Request, Response } from 'express';
import EnemyModel, { Enemy } from '../models/enemyModel';

class EnemyController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const enemy = await EnemyModel.getAll();
      res.status(200).json({
        success: true,
        data: enemy,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data enemy',
        error: error.message,
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const enemy = await EnemyModel.getById(id);

      if (!enemy) {
        res.status(404).json({
          success: false,
          message: 'Enemy tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: enemy,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data enemy',
        error: error.message,
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nama, dif, health } = req.body as Omit<Enemy, 'id'>;

      if (!nama || !dif || !health) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      const id = await EnemyModel.create({ nama, dif, health });

      res.status(201).json({
        success: true,
        message: 'Enemy berhasil ditambahkan',
        data: { id, nama, dif, health },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal menambah enemy',
        error: error.message,
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { nama, dif, health } = req.body as Omit<Enemy, 'id'>;

      if (!nama || !dif || !health) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      const affectedRows = await EnemyModel.update(id, { nama, dif, health });

      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Enemy tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Enemy berhasil diupdate',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengupdate enemy',
        error: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const affectedRows = await EnemyModel.delete(id);

      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Enemy tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Enemy berhasil dihapus',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal menghapus enemy',
        error: error.message,
      });
    }
  }
}

export default EnemyController;