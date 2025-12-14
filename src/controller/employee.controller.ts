import { Request, Response } from "express";
import { EmployeeI, UpdateEmployeeI } from "../types";
import { ResponseService } from "../utils";
import { EmployeeService } from "../service";

const employeeService = new EmployeeService();
const responseService = new ResponseService();

export class EmployeeController {
  getEmployees = async (req: Request, res: Response) => {
    try {
      const employees = await employeeService.fetchAllEmployees();
      responseService.response<EmployeeI[]>({
        res,
        message: `List of Employees : ${employees.length} `,
        data: employees,
      });
    } catch (error) {
      responseService.serverError({
        res,
        error,
        message: "Operation Incomplete",
      });
    }
  };

  getEmployeeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const employee = await employeeService.fetchEmployeeById(id);

      if (employee !== null) {
        return responseService.response<EmployeeI>({
          res,
          message: "Employee Matching Id Found",
          data: employee,
        });
      }

      responseService.response({
        res,
        success: false,
        statusCode: 404,
        message: "Not Matching Employee to Id Found",
      });
    } catch (error) {
      responseService.serverError({
        res,
        error,
        message: "Operation Incomplete",
      });
    }
  };

  createEmployee = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, residence } = req.body;

      const newEmployee: EmployeeI = {
        name,
        email,
        phone,
        residence,
      };

      const employee = await employeeService.createEmployee(newEmployee);

      responseService.response<EmployeeI>({
        res,
        statusCode: 201,
        message: "Employee Registered Successfully",
        data: employee as EmployeeI,
      });
    } catch (error) {
      responseService.serverError({
        res,
        error,
        message: "Operation Incomplete",
      });
    }
  };

  updateEmployee = async (req: Request, res: Response) => {
    try {
      const { id, name, email, phone, residence } = req.query;

      if (
        name === undefined ||
        email === undefined ||
        phone === undefined ||
        residence === undefined
      )
        return responseService.response({
          res,
          success: false,
          statusCode: 400,
          message: "Nothing Updated",
        });

      const employeeExist = await employeeService.fetchEmployeeById(
        id as Object
      );

      if (employeeExist !== null) {
        const employee: UpdateEmployeeI = {
          _id: id as Object,
          name: name !== undefined ? (name as string) : employeeExist.name,
          email: email !== undefined ? (email as string) : employeeExist.email,
          phone: phone !== undefined ? (phone as string) : employeeExist.phone,
          residence: residence as string,
        };

        const updatedEmployee = await employeeService.updateEmployee(employee);

        if (updatedEmployee.modifiedCount > 0) {
          responseService.response({
            res,
            message: "Employee Updated Successfully",
            data: await employeeService.fetchEmployeeById(employee._id),
          });
        }
      } else {
        responseService.response({
          res,
          success: false,
          statusCode: 404,
          message: "No match for Employee Id",
        });
      }
    } catch (error) {
      responseService.serverError({
        res,
        error,
        message: "Operation Incomplete",
      });
    }
  };

  deleteEmployeeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const employeeExist = await employeeService.fetchEmployeeById(
        id as Object
      );

      const employee = await employeeService.deleteEmployeeById(id);
      if (employee.deletedCount > 0) {
        return responseService.response({
          res,
          message: "Employee Deleted",
          data: employeeExist,
        });
      } else {
        return responseService.response({
          res,
          success: false,
          statusCode: 404,
          message: "No match for Employee Id",
        });
      }
    } catch (error) {
      responseService.serverError({
        res,
        error,
        message: "Operation Incomplete",
      });
    }
  };
}
