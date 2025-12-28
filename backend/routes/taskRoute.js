import express from 'express'
import {deleteTask, getTaskById, getTasks, updateTask} from '../controller/taskController.js'
import { validateTask, validateObjectId } from '../middleware/validation.js'

const taskRouter = express.Router();

taskRouter.route('/')
    .get(getTasks);
    // POST route for task creation has been removed

taskRouter.route('/:id')
    .get(validateObjectId('id'), getTaskById)
    .put(validateObjectId('id'), validateTask, updateTask)
    .delete(validateObjectId('id'), deleteTask)


export default taskRouter;