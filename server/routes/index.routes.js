import { Router } from 'express'
import { addNewUser, updateUser, loginUser, logout, logoutAll, getUserProfile, deleteUser } from '../controllers/users.controller.js';
import { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import auth from "../middleware/auth.js"

export const indexRouter = Router()

indexRouter.post('/register', addNewUser)
indexRouter.post('/users/login', loginUser)
indexRouter.post('/users/logout', auth, logout)
indexRouter.post('/users/logoutAll', auth, logoutAll)
indexRouter.patch('/users/me', auth, updateUser)
indexRouter.get('/users/me', auth, getUserProfile)
indexRouter.delete('/users/me', auth, deleteUser)


indexRouter.post('/tasks', auth, createTask)
indexRouter.get('/tasks', auth, getAllTasks)
indexRouter.get('/tasks/:id', auth, getSpecificTask)
indexRouter.patch('/tasks/:id', auth, updateTask)
indexRouter.delete('/tasks/:id', auth, deleteTask)
