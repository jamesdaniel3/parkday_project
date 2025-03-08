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
  async addRestaurant(ctx) {
    try {
      const restaurantData = ctx.request.body;

      // Validate that name is provided
      if (!restaurantData.name) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Restaurant name is required",
        };
        return;
      }

      const newRestaurantId = await dataService.addRestaurant(restaurantData);
      ctx.status = 201; // Created
      ctx.body = {
        status: "success",
        data: { id: newRestaurantId },
      };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};
