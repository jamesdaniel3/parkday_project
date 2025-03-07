module.exports = async (ctx, next) => {
  console.log(`Request received: ${ctx.method} ${ctx.url}`);
  await next();
  console.log(`Response sent: ${ctx.status}`);
};
