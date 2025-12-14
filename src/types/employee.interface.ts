export interface EmployeeI {
  name: string;
  email: string;
  phone: string;
  residence: string;
}

export interface UpdateEmployeeI extends Partial<EmployeeI> {
  _id: object;
}
