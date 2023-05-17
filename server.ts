import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";
import express from "express";
import * as routers from "./routers/index.mjs";
const app = express();
const port = 8080;

const sequelize = new Sequelize(
  process.env.PGDATABESE as string,
  process.env.PGUSER as string,
  process.env.PGPASSWORD as string,
  {
    host: process.env.PGHOST as string,
    port: Number(process.env.PGPORT as string),
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/user", routers.User);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
