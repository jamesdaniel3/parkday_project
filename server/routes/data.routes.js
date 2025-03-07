const Router = require("koa-router");
const dataController = require("../controllers/data.controller");
const router = new Router({ prefix: "/api/data" });

// example route
// router.get("/", dataController.getAllData);
router.get("/get-all-restaurants", dataController.getAllRestaurants);

module.exports = router;
