import db from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Mob {
  id: number;
  nama: string;
  tipe: string;
  health: number;
}

class MobModel {
  static async getAll(): Promise<Mob[]> {
    const query = 'SELECT * FROM mob';
    const [rows] = await db.query<RowDataPacket[]>(query);
    return rows as Mob[];
  }

  static async getById(id: number): Promise<Mob | undefined> {
    const query = 'SELECT * FROM mob WHERE id = ?';
    const [rows] = await db.query<RowDataPacket[]>(query, [id]);
    return rows[0] as Mob | undefined;
  }

  static async create(data: Omit<Mob, 'id'>): Promise<number> {
    const query = 'INSERT INTO mob (nama, tipe, health) VALUES (?, ?, ?)';
    const [result] = await db.query<ResultSetHeader>(query, [data.nama, data.tipe, data.health]);
    return result.insertId;
  }

  static async update(id: number, data: Omit<Mob, 'id'>): Promise<number> {
    const query = 'UPDATE mob SET nama = ?, tipe = ?, health = ? WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(query, [data.nama, data.tipe, data.health, id]);
    return result.affectedRows;
  }

  static async delete(id: number): Promise<number> {
    const query = 'DELETE FROM mob WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(query, [id]);
    return result.affectedRows;
  }
}

export default MobModel;