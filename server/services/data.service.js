const db = require("../database_logic");
const queries = require("../database_logic/queries/users.queries");

module.exports = {
  async getAllRestaurants() {
    const result = await db.query(queries.getAllRestaurants);
    return result.rows;
  },
  // Add more service methods as needed
};
