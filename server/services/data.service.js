const { getRestaurantInfo } = require("../controllers/data.controller");
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

    const result = await db.query(queries.getOpenRestaurants, [
      dayOfWeek,
      currentTime,
      currentTime,
      currentTime,
    ]);
    return result.rows;
  },
  async getRestaurantInfo(restaurantId) {
    const result = await db.query(queries.getRestaurantInfo, [restaurantId]);
    return result.rows;
  },
  async getMenuItems(restaurantId) {
    const day = new Date().getDay();
    const time = new Date().toTimeString().split(" ")[0];

    const result = await db.query(queries.getMenuItems, [
      day,
      restaurantId,
      time,
      time,
      time,
    ]);
    return result.rows;
  },
  async addRestaurant(restaurantData) {
    // Extract field names and values from the provided data
    const fields = Object.keys(restaurantData).filter(
      (key) => restaurantData[key] !== undefined && restaurantData[key] !== null
    );

    const values = fields.map((field) => restaurantData[field]);

    // Create placeholders for prepared statement ($1, $2, etc.)
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    // Create the query string
    const queryText = `
    INSERT INTO restaurants (${fields.join(", ")})
    VALUES (${placeholders})
    RETURNING id
  `;

    const result = await db.query(queryText, values);
    return result.rows[0].id;
  },
  async addMenu(menuData) {
    // Extract field names and values from the provided data
    const fields = Object.keys(menuData).filter(
      (key) => menuData[key] !== undefined && menuData[key] !== null
    );

    const values = fields.map((field) => menuData[field]);

    // Create placeholders for prepared statement ($1, $2, etc.)
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    const queryText = `
      INSERT INTO restaurant_menus (${fields.join(", ")})
      VALUES (${placeholders})
      RETURNING id
    `;

    const result = await db.query(queryText, values);

    return result.rows[0]?.id;
  },
  async addMenuItem(menuItemData) {
    // Extract field names and values from the provided data
    const fields = Object.keys(menuItemData).filter(
      (key) => menuItemData[key] !== undefined && menuItemData[key] !== null
    );

    const values = fields.map((field) => menuItemData[field]);

    // Create placeholders for prepared statement ($1, $2, etc.)
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    // Create the query string
    const queryText = `
    INSERT INTO menu_items (${fields.join(", ")})
    VALUES (${placeholders})
    RETURNING id
  `;
    await db.query(queryText, values);

    return;
  },
};
