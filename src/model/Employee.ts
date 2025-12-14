import mongoose from "mongoose";
import schema, { Schema } from "mongoose";

export const EmployeeSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  residence: String,
});

export const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
