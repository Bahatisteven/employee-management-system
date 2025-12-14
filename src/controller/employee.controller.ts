import { Request, Response } from "express";
import { EmployeeService } from "../service/employee.service";
import { EmployeeI, UpdateEmployeeI } from "../types";

const employeeService = new EmployeeService();

export class EmployeeController {
  getEmployees = (req: Request, res: Response) => {
    const employees = employeeService.fetchAllEmployees();
    employees.then((value) =>
      res.json({
        message: `Fetched ${value.length} Employees`,
        data: value,
      })
    );
  };

  createEmployee = (req: Request, res: Response) => {
    const { name, email, phone, residence } = req.body;

    const newEmployee: EmployeeI = {
      name,
      email,
      phone,
      residence,
    };

    const employee = employeeService.createEmployee(newEmployee);

    employee.then((value) => {
      res.json({
        data: value,
      });
    });
  };

  updateEmployee = (req: Request, res: Response) => {
    const { id, name, email, phone, residence } = req.query;

    const employee: UpdateEmployeeI = {
      _id: id as Object,
      phone: phone as string,
      residence: residence as string,
    };

    employeeService.updateEmployee(employee).then((value) => {
      return res.json({
        message: "Employee Updated Successfully",
        updatedCount: value,
      });
    });
  };

  deleteEmployeeById = (req: Request, res: Response) => {
    const { id } = req.params;
    employeeService.deleteEmployeeById(id).then((value) => {
      return res.json({
        message: "Employee Deleted",
        deletedEmployees: value,
      });
    });

    // return res.json({
    //   message: "Employee not Deleted",
    // });
  };
}
