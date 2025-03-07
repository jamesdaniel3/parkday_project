const dataService = require("../services/data.service");

module.exports = {
  async getAllRestaurants(ctx) {
    try {
      const data = await dataService.getAllRestaurants();
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
  async getOpenRestaurants(ctx) {
    try {
      const data = await dataService.getOpenRestaurants();
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
  async getMenuItems(ctx) {
    try {
      const restaurantId = ctx.params.restaurantId;

      const data = await dataService.getMenuItems(restaurantId);
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};
