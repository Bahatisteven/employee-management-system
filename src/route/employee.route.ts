import express, { Router } from "express";
import { createEmployeeSchema, idEmployeeSchema } from "../schemas";
import { EmployeeController } from "../controller";
import { validateMiddleware } from "../middleware";

const employeeRoute: Router = express.Router();
const employeeController = new EmployeeController();

employeeRoute.post(
  "/",
  validateMiddleware(createEmployeeSchema),
  employeeController.createEmployee
);

employeeRoute.get("/", employeeController.getEmployees);

employeeRoute.get("/:id", employeeController.getEmployeeById);

employeeRoute.put(
  "/",
  validateMiddleware(idEmployeeSchema, "query"),
  employeeController.updateEmployee
);

employeeRoute.delete(
  "/:id",
  validateMiddleware(idEmployeeSchema, "params"),
  employeeController.deleteEmployeeById
);

export default employeeRoute;
