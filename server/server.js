const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello world";
});

app.listen(5005, () => {
  console.log(`Application running on port 5005`);
});
