const Router = require("koa-router");
const dataController = require("../controllers/data.controller");
const router = new Router({ prefix: "/api/data" });

router.get("/get-all-restaurants", dataController.getAllRestaurants);
router.get("/get-open-restaurants", dataController.getOpenRestaurants);
router.get("/get-menu-items/:restaurantId", dataController.getMenuItems);
router.get(
  "/get-restaurant-info/:restaurantId",
  dataController.getRestaurantInfo
);

router.post("/add-restaurant", dataController.addRestaurant);
router.post("/add-menu", dataController.addMenu);
router.post("/add-menu-item", dataController.addMenuItem);

module.exports = router;
