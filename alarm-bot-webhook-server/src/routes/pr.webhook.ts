// src/routes/user.routes.ts
import express from 'express';
import {createPrAlarm} from '../controller/pr.controller';

const router = express.Router();

router.post('/', createPrAlarm);

export default router;