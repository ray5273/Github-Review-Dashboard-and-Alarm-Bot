// src/routes/repo.routes.ts
import express from 'express';
import { createRepo, getRepos } from '../controller/repo.controller';

const router = express.Router();

router.get('/', getRepos);
router.post('/', createRepo);

export default router;