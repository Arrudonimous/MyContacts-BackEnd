const db = require('../../database');

class CategoriesRepository {
  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories
      (name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  async findAll() {
    const [rows] = await db.query(`
      SELECT * FROM categories;
    `);
    return rows;
  }

  update() {

  }

  delete() {

  }

  findById() {

  }

  findByName() {

  }
}

module.exports = new CategoriesRepository();