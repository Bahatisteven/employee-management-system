import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import { errorHandler } from './middlewares/errorHandlers';

const app = express();

app.use(express.json());

//Routes
app.use('/api/items', employeeRoutes);
app.use(errorHandler);

export default app;