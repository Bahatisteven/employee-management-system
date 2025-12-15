import { Router } from 'express'
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employeeController'

const router = Router();
router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/:id', updateEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;