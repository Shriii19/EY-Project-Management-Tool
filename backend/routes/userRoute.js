import express from 'express';
import { updateProfile, getCurrentUser, getUserStats, getUserActivity, login, signup } from '../controller/userController.js';
import { validateUserProfile } from '../middleware/validation.js';

const userRouter = express.Router();

// Auth routes (public)
userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Protected routes
userRouter.get('/me', getCurrentUser);
userRouter.put('/profile', validateUserProfile, updateProfile);
userRouter.get('/stats', getUserStats);
userRouter.get('/activity', getUserActivity);

export default userRouter;