import express from 'express';
import {
    createTasks,
    deleteTasks,
    updateTask,
    fetchTasks,
    updateTaskStatus,
    getTaskById
} from '../controllers/task.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const taskRouter = express.Router();


taskRouter.post('/', verifyToken, createTasks);
taskRouter.delete('/delete/:id/:userId', verifyToken, deleteTasks);
taskRouter.put('/update-task/', verifyToken, updateTask);
taskRouter.get('/tasks/:userId', verifyToken, fetchTasks);
taskRouter.put('/update-status', verifyToken, updateTaskStatus);
taskRouter.get('/task/:id', verifyToken, getTaskById);

export default taskRouter;
