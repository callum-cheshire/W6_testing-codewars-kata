import express from "express";
import morgan from "morgan";
import { todosRouter } from "./routes/todos.router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/todos", todosRouter);

export default app;
