import express, { Express } from "express";
import { config, databaseConnection } from "./config";
import mainRoute from "./route";

const app: Express = express();

// app.use(cors())
app.use(express.json());
app.use(mainRoute);

databaseConnection().then((value) => {
  app.listen(config.port, () => {
    console.log(`Backend Server is running on port ${config.port}`);
  });
});
