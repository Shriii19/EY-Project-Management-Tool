import express from 'express';
import { updatePassword, updateProfile, getCurrentUser } from '../controller/userController.js';
import authMiddleware from '../middleware/auth.js'

const userRouter = express.Router();

//Public Routes
// User registration and login routes have been removed

//Private Routes

userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;