// src/app.ts
import express from "express";
import userRoutes from "./routers/user.routes";
import repoRoutes from "./routers/repo.routes";

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/repos', repoRoutes);




export default app;
