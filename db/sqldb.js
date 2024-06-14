const Pool = require('pg');

const pool = new Pool({
  user: 'cashr',
  host: 'localhost',
  database: 'jscruddb',
  password: 'admin',
  port: 5432,
});

class DB {
  async getUserById(id) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  }

  async getAllUsers() {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  }

  async addUser(name, age) {
    const res = await pool.query(
      'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
      [name, age]
    );
    console.log("new user:", res);
    return res.rows[0];
  }

  async deleteUserById(id) {
    const res = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  async updateUserInfo(id, name, age) {
    const res = await pool.query(
      'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *',
      [name, age, id]
    );
    return res.rows[0];
  }
}

const db = new DB();

module.exports = db;
