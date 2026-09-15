const db = require('../config/database');

class EnemyModel {
    static async getAll() {
        const query = 'SELECT * FROM enemy';
        const [rows] = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM enemy WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const query = 'INSERT INTO enemy (nama, dif, health) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [data.nama, data.dif, data.health]);
        return result.insertId;
    }

    static async update(id, data) {
        const query = 'UPDATE enemy SET nama = ?, dif = ?, health = ? WHERE id = ?';
        const [result] = await db.query(query, [data.nama, data.dif, data.health, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const query = 'DELETE FROM enemy WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows;
    }
}

module.exports = EnemyModel;