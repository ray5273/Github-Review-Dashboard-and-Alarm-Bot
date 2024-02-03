// src/app.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import repoRoutes from "./routes/repo.routes";

const app = express();
const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/repos', repoRoutes);
app.use('/channel-repo-alarm', repoRoutes);
app.use('/user-repo-alarm', repoRoutes);

export default app;
