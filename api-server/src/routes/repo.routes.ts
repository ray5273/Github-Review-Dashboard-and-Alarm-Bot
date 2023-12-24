// src/routes/repo.routes.ts
import express from 'express';
import { createRepo, getRepos, deleteRepo } from '../controller/repo.controller';

const router = express.Router();

router.get('/', getRepos);
router.post('/', createRepo);
router.delete('/:id', deleteRepo);

export default router;