const Router = require("koa-router");
const router = new Router({ prefix: "/api/test" });
const db = require("../database");

router.get("/health", (ctx) => {
  ctx.body = { status: "ok" };
});

router.get("/db-test", async (ctx) => {
  try {
    console.log("Attempting database query");
    const result = await db.query("SELECT NOW() as current_time");
    console.log("Database query result:", result.rows[0]);
    ctx.body = {
      status: "Database connection successful",
      timestamp: result.rows[0].current_time,
    };
  } catch (error) {
    console.error("Database error:", error);
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: "Database connection failed: " + error.message,
    };
  }
});

module.exports = router;
