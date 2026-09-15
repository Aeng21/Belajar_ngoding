import db from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Enemy {
  id: number;
  nama: string;
  dif: string;
  health: number;
}

class EnemyModel {
  static async getAll(): Promise<Enemy[]> {
    const query = 'SELECT * FROM enemy';
    const [rows] = await db.query<RowDataPacket[]>(query);
    return rows as Enemy[];
  }

  static async getById(id: number): Promise<Enemy | undefined> {
    const query = 'SELECT * FROM enemy WHERE id = ?';
    const [rows] = await db.query<RowDataPacket[]>(query, [id]);
    return rows[0] as Enemy | undefined;
  }

  static async create(data: Omit<Enemy, 'id'>): Promise<number> {
    const query = 'INSERT INTO enemy (nama, dif, health) VALUES (?, ?, ?)';
    const [result] = await db.query<ResultSetHeader>(query, [data.nama, data.dif, data.health]);
    return result.insertId;
  }

  static async update(id: number, data: Omit<Enemy, 'id'>): Promise<number> {
    const query = 'UPDATE enemy SET nama = ?, dif = ?, health = ? WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(query, [data.nama, data.dif, data.health, id]);
    return result.affectedRows;
  }

  static async delete(id: number): Promise<number> {
    const query = 'DELETE FROM enemy WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(query, [id]);
    return result.affectedRows;
  }
}

export default EnemyModel;