const db = require("../database");
const queries = require("../database/queries/users.queries");

module.exports = {
  async getAllData() {
    const result = await db.query(queries.getAllUsers);
    return result.rows;
  },

  async getDataById(id) {
    const result = await db.query(queries.getUserById, [id]);
    return result.rows[0];
  },

  async createData(data) {
    const { name, email } = data;
    const result = await db.query(queries.createUser, [name, email]);
    return result.rows[0];
  },
  // Add more service methods as needed
};
