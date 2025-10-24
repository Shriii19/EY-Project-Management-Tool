import express from 'express';
import { updateProfile, getCurrentUser } from '../controller/userController.js';

const userRouter = express.Router();

// All authentication removed - open access demo app

userRouter.get('/me', getCurrentUser);
userRouter.put('/profile', updateProfile);

export default userRouter;