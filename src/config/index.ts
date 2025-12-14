import dotenv from "dotenv";

dotenv.config();

interface ConfigI {
  port: number;
}
export const config: ConfigI = {
  port: Number(process.env.PORT) || 3500,
};

export * from "./databaseConfig";
