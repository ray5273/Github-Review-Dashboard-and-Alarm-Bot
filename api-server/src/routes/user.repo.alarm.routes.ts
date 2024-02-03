// src/routes/repo.routes.ts
import express from 'express';
import {createUserRepoAlarm, deleteUserRepoAlarm, getUserRepoAlarm} from "../controller/user.repo.alarm.controller";

const router = express.Router();

router.get('/', getUserRepoAlarm);
router.post('/', createUserRepoAlarm);
router.delete('/:user_name/:repo_id', deleteUserRepoAlarm);

export default router;