import { Request, Response } from 'express';
import PlayerModel, { Player } from '../models/playerModel';

class PlayerController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const player = await PlayerModel.getAll();
      res.status(200).json({
        success: true,
        data: player,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data player',
        error: error.message,
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const player = await PlayerModel.getById(id);

      if (!player) {
        res.status(404).json({
          success: false,
          message: 'Player tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: player,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data player',
        error: error.message,
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nama, alamat, rank } = req.body as Omit<Player, 'id'>;

      if (!nama || !alamat || !rank) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      const id = await PlayerModel.create({ nama, alamat, rank });

      res.status(201).json({
        success: true,
        message: 'Player berhasil ditambahkan',
        data: { id, nama, alamat, rank },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal menambah player',
        error: error.message,
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { nama, alamat, rank } = req.body as Omit<Player, 'id'>;

      if (!nama || !alamat || !rank) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      const affectedRows = await PlayerModel.update(id, { nama, alamat, rank });

      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Player tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Player berhasil diupdate',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengupdate player',
        error: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const affectedRows = await PlayerModel.delete(id);

      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Player tidak ditemukan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Player berhasil dihapus',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Gagal menghapus player',
        error: error.message,
      });
    }
  }
}

export default PlayerController;