import express from 'express'
import authMiddleware from '../middleware/auth.js';
import {deleteTask, getTaskById, getTasks, updateTask} from '../controller/taskController.js'

const taskRouter = express.Router();

taskRouter.route('/gp')
    .get(authMiddleware, getTasks);
    // POST route for task creation has been removed

taskRouter.route('/:id/gp')
    .get(authMiddleware, getTaskById)
    .put(authMiddleware, updateTask)
    .delete(authMiddleware, deleteTask)


export default taskRouter;