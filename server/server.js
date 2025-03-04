const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello world";
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
