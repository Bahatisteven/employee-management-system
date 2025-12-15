import dotenv from 'dotenv';
import { EnvConfig, envSchema } from '../validation/env.validation'
import { ZodError, ZodRealError } from 'zod';

dotenv.config();

export const validateEnv = () => {
    try {
        const envVars: EnvConfig = envSchema.parse(process.env);
        return {
            port: +envVars.PORT,
            env: envVars.NODE_ENV,
            MONGO_DB_URL: envVars.MONGO_DB_URL
        };
    } catch (error) {
        let message = undefined;
        if (error instanceof ZodError) {
            message = error.issues;
        } else {
            console.error('Error parsing environment variables:', error);
        }
    }
};


