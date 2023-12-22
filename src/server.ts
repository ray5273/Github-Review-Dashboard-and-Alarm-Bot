// src/server.ts
import "reflect-metadata";
// import { createConnection } from "typeorm";
import { initDatabase,AppDataSource } from "./database"
import app from "./app";

initDatabase();

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

