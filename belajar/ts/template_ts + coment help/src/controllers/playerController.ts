import { Request, Response } from 'express';
import PlayerModel, { Player } from '../models/playerModel.js';

class PlayerController {
  static async getAll(req: Request, res: Response): Promise<void> {
     // try(mencoba): coba jalankan kode ini
    try {
      const player = await PlayerModel.getAll();

      // Mengirim response dengan status 200 (OK) dan data dalam format JSON.
      // .json() mengirim response berupa JSON dengan properti success dan data.
      res.status(200).json({
        success: true,   // Menandakan operasi berhasil.
        data: player,    // Data yang diminta.
      });
       // catch(menangkap): kalau kode di atas gagal, jalankan bagian ini
      // error: any karena kita tidak tahu tipe error yang mungkin muncul.
    } catch (error: any) {
      // Jika terjadi error (misal koneksi database gagal), tangkap dan kirim response 500 (Internal Server Error).
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data player',
        error: error.message, // Mengirim pesan error untuk debugging (bisa dihapus di production).
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      // Mengambil parameter ID dari URL (misal /api/player/5). req.params.id berisi string.
      // 'as string' memberi tahu TypeScript bahwa nilai ini pasti string (karena bisa undefined).
      // parseInt() mengubah string menjadi integer (bilangan bulat).
      const id = parseInt(req.params.id as string);
      // Memanggil model untuk mencari player dengan ID tersebut.
      const player = await PlayerModel.getById(id);

      // Jika player tidak ditemukan (undefined), kirim response 404 Not Found.
      // return digunakan untuk menghentikan eksekusi fungsi setelah mengirim response.
      if (!player) {
        res.status(404).json({
          success: false,
          message: 'Player tidak ditemukan',
        });
        return;
      }

      // Jika ditemukan, kirim data dengan status 200.
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
      // const {} = destructuring
      // const { nama, alamat, rank } = ... setara dengan: const nama = req.body.nama; const alamat = req.body.alamat; const rank = req.body.rank;
      // 'as Omit<Player, 'id'>' berarti kita menganggap req.body memiliki struktur Player tanpa properti id
      // (karena id di-generate otomatis oleh database, tidak perlu dikirim dari client).
      const { nama, alamat, rank } = req.body as Omit<Player, 'id'>;

      // Validasi sederhana: pastikan semua field terisi. Jika ada yang kosong, kirim response 400 Bad Request.
      if (!nama || !alamat || !rank) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      const id = await PlayerModel.create({ nama, alamat, rank });

      // Response 201 Created menunjukkan resource berhasil dibuat.
      res.status(201).json({
        success: true,
        message: 'Player berhasil ditambahkan',
        // Kita kirimkan kembali data yang baru dibuat beserta ID-nya.
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
      const id = parseInt(req.params.id as string);
      const { nama, alamat, rank } = req.body as Omit<Player, 'id'>;

      if (!nama || !alamat || !rank) {
        res.status(400).json({
          success: false,
          message: 'Data harus diisi',
        });
        return;
      }

      // Panggil model untuk update. Method update mengembalikan jumlah baris yang terpengaruh (affectedRows).
      const affectedRows = await PlayerModel.update(id, { nama, alamat, rank });

      // Jika affectedRows = 0, artinya tidak ada baris yang diubah, kemungkinan ID tidak ditemukan.
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
      const id = parseInt(req.params.id as string);

      // Panggil model untuk menghapus data. Mengembalikan affectedRows.
      const affectedRows = await PlayerModel.delete(id);

      // Jika tidak ada baris yang terhapus, ID tidak ditemukan.
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