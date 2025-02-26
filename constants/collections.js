import dotenv from "dotenv";
dotenv.config();

export const DB_NAME = process.env.DB_NAME || '';
export const DOCTORS = 'doctors';
export const ERROR_LOGS = "errorLogs";
export const ACTIVITIES = 'activities';

