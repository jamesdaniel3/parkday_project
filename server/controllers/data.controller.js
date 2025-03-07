const dataService = require("../services/data.service");

module.exports = {
  // example controller
  //   async getAllData(ctx) {
  //     try {
  //       const data = await dataService.getAllData();
  //       ctx.body = { status: "success", data };
  //     } catch (error) {
  //       ctx.throw(500, error.message);
  //     }
  //   },
  async getAllRestaurants(ctx) {
    try {
      const data = await dataService.getAllRestaurants();
      ctx.body = { status: "success", data };
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};
