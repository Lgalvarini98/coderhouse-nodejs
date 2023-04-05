import express from "express";
import usersRouter from "./routes/usersRoute.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

app.listen(8080, () => console.log("Server Up!"));
