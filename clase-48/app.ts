import { Application } from "https://deno.land/x/aok/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});
