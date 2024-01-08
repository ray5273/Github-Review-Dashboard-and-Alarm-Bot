// src/app.ts
import express from "express";
import cors from "cors";
import alarmRoutes from "./routes/pr.webhook";

const app = express();
const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/alarm', alarmRoutes);

export default app;
