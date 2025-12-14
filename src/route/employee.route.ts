import express, { Router } from "express";
import { EmployeeController } from "../controller/employee.controller";

const employeeRoute: Router = express.Router();
const employeeController = new EmployeeController();

employeeRoute.get("/", employeeController.getEmployees);
employeeRoute.post("/", employeeController.createEmployee);
employeeRoute.put("/", employeeController.updateEmployee);
employeeRoute.delete("/:id", employeeController.deleteEmployeeById);

export default employeeRoute;
