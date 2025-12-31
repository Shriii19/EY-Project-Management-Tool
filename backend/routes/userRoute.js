import express from 'express';
import { updateProfile, getCurrentUser, getUserStats, getUserActivity } from '../controller/userController.js';
import { validateUserProfile } from '../middleware/validation.js';

const userRouter = express.Router();

// All authentication removed - open access demo app

userRouter.get('/me', getCurrentUser);
userRouter.put('/profile', validateUserProfile, updateProfile);
userRouter.get('/stats', getUserStats);
userRouter.get('/activity', getUserActivity);

export default userRouter;