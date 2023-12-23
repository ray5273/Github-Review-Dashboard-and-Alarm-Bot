// src/server.ts
import "reflect-metadata";
import { initDatabase,AppDataSource } from "../../shared/src/db/database"
import app from "./app";

initDatabase().then(() => {
    app.listen(8080, () => {
        console.log("Server is listening on port 8080");
    });
}).catch((error) => {
    console.log(error);
    process.exit(1);
});



