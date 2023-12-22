// src/routes/user.routes.ts
import express from 'express';
import { createUser, getUser } from '../controller/user.controller';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);

export default router;