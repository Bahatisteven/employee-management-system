import { Request, Response, NextFunction } from 'express';
import { items, Employee } from '../models/employee';

//Create an item
export const createEmployee = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name,email,phone_number,residence } = req.body;
        const newEmployee: Employee = {id: Date.now(), name, email, phone_number, residence };
        items.push(newEmployee);
        res.status(201).json(newEmployee);
    }   catch (error) {
        next(error);
    }
};
//Read all items
export const getEmployees = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(items);
    } catch (error){
        next(error);
    }
};

//Read single item
export const getEmployeeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const employee = items.find((i) => i.id === id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found'});
            return;
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
};

// Update an item
export const updateEmployee = (req:Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const {name} = req.body;
        const itemIndex = items.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            res.status(404).json({message: 'Employee not found'});
            return;
        }
        items[itemIndex].name = name;
        res.json(items[itemIndex]);
    } catch (error){
        next(error);
    }
};

//Delete an item

export const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const employeeIndex = items.findIndex((i) => i.id === id);
        if (employeeIndex === -1) {
            res.status(404).json({message: 'item not found' });
            return;
        }
        const deletedItem = items.splice(employeeIndex, 1) [0];
        res.json(deleteEmployee);
    } catch (error) {
        next(error);
    }
};