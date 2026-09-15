const db = require('../config/database');

class PlayerModel {
    static async getAll() {
        const query = 'SELECT * FROM player';
        const [rows] = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM player WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const query = 'INSERT INTO player (nama, alamat, rank) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [data.nama, data.alamat, data.rank]);
        return result.insertId;
    }

    static async update(id, data) {
        const query = 'UPDATE player SET nama = ?, alamat = ?, rank = ? WHERE id = ?';
        const [result] = await db.query(query, [data.nama, data.alamat, data.rank, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const query = 'DELETE FROM player WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows;
    }
}

module.exports = PlayerModel;