const db = require("../database_logic");
const queries = require("../database_logic/queries/users.queries");

module.exports = {
  async getAllRestaurants() {
    const result = await db.query(queries.getAllRestaurants);
    return result.rows;
  },
  async getOpenRestaurants() {
    const dayOfWeek = new Date().getDay();
    const currentTime = new Date().toTimeString().split(" ")[0];

    console.log(dayOfWeek);
    console.log(currentTime);

    const result = await db.query(queries.getOpenRestaurants, [
      dayOfWeek,
      currentTime,
      currentTime,
      currentTime,
    ]);
    return result.rows;
  },
  // Add more service methods as needed
};
