import express from 'express'
import {deleteTask, getTaskById, getTasks, updateTask} from '../controller/taskController.js'

const taskRouter = express.Router();

taskRouter.route('/')
    .get(getTasks);
    // POST route for task creation has been removed

taskRouter.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask)


export default taskRouter;