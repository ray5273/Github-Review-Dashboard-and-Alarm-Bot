// src/routes/user.routes.ts
import express from 'express';
import {createUser, deleteUser, getUser} from '../controller/user.controller';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.delete('/:name/:company_id', deleteUser);

export default router;