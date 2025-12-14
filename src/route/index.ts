import express, { Router } from "express";
import employeeRoute from "./employee.route";

const mainRoute: Router = express.Router();

mainRoute.use("/employee", employeeRoute);

export default mainRoute;
