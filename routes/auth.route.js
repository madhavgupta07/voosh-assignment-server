import express from 'express';
import { signup, login } from '../controllers/auth.controller.js'; // Adjust the path as necessary

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);

export default authRouter;
