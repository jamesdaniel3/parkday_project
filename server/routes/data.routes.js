const Router = require("koa-router");
const dataController = require("../controllers/data.controller");
const router = new Router({ prefix: "/api/data" });

router.get("/get-all-restaurants", dataController.getAllRestaurants);
router.get("/get-open-restaurants", dataController.getOpenRestaurants);
router.get("/get-menu-items/:restaurantId", dataController.getMenuItems);

module.exports = router;
