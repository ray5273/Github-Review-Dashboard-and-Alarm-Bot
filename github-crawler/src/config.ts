import dotenv from 'dotenv';

dotenv.config();

export const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PORT = 5432;
export const POSTGRES_DATABASE = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const HTTPS_PROXY = process.env.HTTPS_PROXY;
export const INTERNAL_GITHUB_HOSTNAME = process.env.INTERNAL_GITHUB_HOSTNAME;
export const INTERNAL_GITHUB_TOKEN = process.env.INTERNAL_GITHUB_TOKEN;