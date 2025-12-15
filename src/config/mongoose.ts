import { connect, set } from 'mongoose';
import { validateEnv } from '../config/env.config';
const MONGO_DB_URL = process.env.MONGO_DB_URL;

export const connectToDB = async () => {
    try {
        set('strictQuery', false);
        const db = await connect(MONGO_DB_URL!);
        console.log('MongoDB connected to', db.connection.name);
    } catch (error) {
        console.error(error);
    }
};