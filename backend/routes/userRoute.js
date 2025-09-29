import express from 'express';
import { updatePassword, updateProfile, getCurrentUser } from '../controller/userController.js';

const userRouter = express.Router();

//Public Routes
// User registration and login routes have been removed

//Private Routes

userRouter.get('/me', getCurrentUser);
userRouter.put('/profile', updateProfile);
userRouter.put('/password', updatePassword);

export default userRouter;