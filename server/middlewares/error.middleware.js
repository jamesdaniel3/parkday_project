module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server error:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: "error",
      message: err.message || "An error occurred",
    };
  }
};
