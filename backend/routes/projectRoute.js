import express from 'express';
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../controller/projectController.js';
import { validateObjectId } from '../middleware/validation.js';

const projectRouter = express.Router();

projectRouter.route('/')
    .get(getProjects)
    .post(createProject);

projectRouter.route('/:id')
    .get(validateObjectId('id'), getProjectById)
    .put(validateObjectId('id'), updateProject)
    .delete(validateObjectId('id'), deleteProject);

export default projectRouter;
