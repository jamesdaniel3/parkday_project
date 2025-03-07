const healthRoutes = require("./health.routes");
const dataRoutes = require("./data.routes");

module.exports = (app) => {
  app.use(healthRoutes.routes());
  app.use(healthRoutes.allowedMethods());

  app.use(dataRoutes.routes());
  app.use(dataRoutes.allowedMethods());

  // 404 handler
  app.use((ctx) => {
    ctx.status = 404;
    ctx.body = {
      status: "error",
      message: "Route not found",
    };
  });
};
