import { Client } from 'pg';
import {POSTGRES_HOST,POSTGRES_PORT,POSTGRES_USER,POSTGRES_DATABASE,POSTGRES_PASSWORD} from './config';

const client = new Client({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export async function executeQuery(query: string) {
    try {
        await client.connect();
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}