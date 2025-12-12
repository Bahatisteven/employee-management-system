import express, { Express } from "express";
import { config } from "./config";

const app: Express = express();

app.listen(config.port, () => {
  console.log(`Backend Server is running on port ${config.port}`);
});
