import { EmployeeModel } from "../model";
import { EmployeeI, UpdateEmployeeI } from "../types";

export class EmployeeService {
  fetchAllEmployees = async (): Promise<EmployeeI[]> => {
    return (await EmployeeModel.find()) as EmployeeI[];
  };

  employeeExist = async (id: object): Promise<boolean> => {
    const value = await this.fetchEmployeeById(id);
    return value !== null;
  };

  fetchEmployeeById = async (id: Object): Promise<EmployeeI> => {
    const employee = (await EmployeeModel.findById(id)) as EmployeeI;
    return employee;
  };

  createEmployee = async (emp: EmployeeI) => {
    const newEmployee = await EmployeeModel.create({
      ...emp,
    });

    await newEmployee.save();

    return newEmployee;
  };

  updateEmployee = async (emp: UpdateEmployeeI) => {
    const employee = await EmployeeModel.updateOne(
      { _id: emp._id },
      { ...emp }
    );
    return employee;
  };
  deleteEmployeeById = async (id: Object) => {
    const employee = await EmployeeModel.deleteMany({ _id: id });
    return employee;
  };
}
