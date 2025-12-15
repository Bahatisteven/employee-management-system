import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

const Config: Config = {
    port: Number(process.env.PORT) || 8050,
    nodeEnv: process.env.NODE_ENV || 'development'
};

export default Config;