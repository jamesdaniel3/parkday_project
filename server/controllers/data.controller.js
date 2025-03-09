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
  async getRestaurantInfo(ctx) {
    try {
      const restaurantId = ctx.params.restaurantId;

      if (!restaurantId) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Restaurant ID is required",
        };
        return;
      }

      const data = await dataService.getRestaurantInfo(restaurantId);
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
  async getMenuItems(ctx) {
    try {
      const restaurantId = ctx.params.restaurantId;

      if (!restaurantId) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Restaurant ID is required",
        };
        return;
      }

      const data = await dataService.getMenuItems(restaurantId);
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
  async addRestaurant(ctx) {
    try {
      const restaurantData = ctx.request.body;

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
  async addMenu(ctx) {
    try {
      const menuData = ctx.request.body;

      if (!menuData.restaurant_id) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Restaurant id is required",
        };
        return;
      }

      const newMenuID = await dataService.addMenu(menuData);
      ctx.status = 201; // Created
      ctx.body = {
        status: "success",
        data: { id: newMenuID },
      };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
  async addMenuItem(ctx) {
    try {
      const menuItemData = ctx.request.body;

      if (!menuItemData.name) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Item name is required",
        };
        return;
      }
      if (!menuItemData.menu_id) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Menu id is required",
        };
        return;
      }

      if (
        menuItemData.is_paleo === undefined ||
        menuItemData.is_vegetarian === undefined ||
        menuItemData.is_vegan === undefined ||
        menuItemData.is_dairy_free === undefined ||
        menuItemData.is_keto === undefined
      ) {
        // Missing at least one field - provide default values
        const requiredDietFields = [
          "is_paleo",
          "is_vegetarian",
          "is_vegan",
          "is_dairy_free",
          "is_keto",
        ];

        // Add missing fields with default value of false
        for (const field of requiredDietFields) {
          if (menuItemData[field] === undefined) {
            menuItemData[field] = false;
            console.log(
              `Added default false value for missing field: ${field}`
            );
          }
        }
      }

      await dataService.addMenuItem(menuItemData);
      ctx.status = 201; // Created
      ctx.body = {
        status: "success",
      };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};
