import express from 'express';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post('/signup', authControllers.register);
router.post('/login', authControllers.login);

export const AuthRoutes = router;
