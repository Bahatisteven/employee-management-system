import { EmployeeModel } from "../model/employee";
import { EmployeeI, UpdateEmployeeI } from "../types";

export class EmployeeService {
  fetchAllEmployees = async (): Promise<EmployeeI[]> => {
    return (await EmployeeModel.find()) as EmployeeI[];
  };

  fetchEmployeeById = async (id: Object) => {
    const employee = await EmployeeModel.findById(id);
    return employee;
  };

  createEmployee = async (emp: EmployeeI): Promise<EmployeeI> => {
    const newEmployee = await EmployeeModel.create({
      ...emp,
    });

    await newEmployee.save();

    return newEmployee as EmployeeI;
  };

  updateEmployee = async (emp: UpdateEmployeeI) => {
    const employee = await EmployeeModel.updateOne({ ...emp });
    return employee.modifiedCount;
  };
  deleteEmployeeById = async (id: Object) => {
    const employee = await EmployeeModel.deleteMany({ _id: id });
    return employee.deletedCount;
  };
}
