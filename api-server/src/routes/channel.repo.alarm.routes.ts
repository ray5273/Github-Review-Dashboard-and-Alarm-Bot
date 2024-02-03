// src/routes/repo.routes.ts
import express from 'express';
import {
    createChannelRepoAlarm,
    deleteChannelRepoAlarm,
    getChannelRepoAlarm
} from "../controller/channel.repo.alarm.controller";

const router = express.Router();

router.get('/', getChannelRepoAlarm);
router.post('/', createChannelRepoAlarm);
router.delete('/:channel_id/:repo_id', deleteChannelRepoAlarm);

export default router;