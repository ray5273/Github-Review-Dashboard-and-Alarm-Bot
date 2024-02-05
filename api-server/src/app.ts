// src/app.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import repoRoutes from "./routes/repo.routes";
import channelRepoAlarmRoutes from "./routes/channel.repo.alarm.routes";
import userRepoAlarmRoutes from "./routes/user.repo.alarm.routes";

const app = express();
const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/repos', repoRoutes);
app.use('/channel-repo-alarm', channelRepoAlarmRoutes);
app.use('/user-repo-alarm', userRepoAlarmRoutes);

export default app;
