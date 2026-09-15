import db from '../config/database.js';
class MobModel {
    static async getAll() {
        const query = 'SELECT * FROM mob';
        const [rows] = await db.query(query);
        return rows;
    }
    static async getById(id) {
        const query = 'SELECT * FROM mob WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }
    static async create(data) {
        const query = 'INSERT INTO mob (nama, tipe, health) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [data.nama, data.tipe, data.health]);
        return result.insertId;
    }
    static async update(id, data) {
        const query = 'UPDATE mob SET nama = ?, tipe = ?, health = ? WHERE id = ?';
        const [result] = await db.query(query, [data.nama, data.tipe, data.health, id]);
        return result.affectedRows;
    }
    static async delete(id) {
        const query = 'DELETE FROM mob WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows;
    }
}
export default MobModel;
