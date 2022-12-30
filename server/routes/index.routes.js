import { Router } from 'express'
import { addNewUser, updateUser, loginUser, logout, logoutAll, getUserProfile, deleteUser,  uploadAvatar,getAvatar} from '../controllers/users.controller.js';
import { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import {createNewWedding,getWedding,updateWedding,deleteWedding,uploadImage, getImages} from '../controllers/wedding.controller.js'


import auth from "../middleware/auth.js"
import upload from "../middleware/upload.js"


export const indexRouter = Router()


//users
indexRouter.post('/register', addNewUser)
indexRouter.post('/users/login', loginUser)
indexRouter.post('/users/logout', auth, logout)
indexRouter.post('/users/logoutAll', auth, logoutAll)
indexRouter.patch('/users/me', auth, updateUser)
indexRouter.get('/users/me', auth, getUserProfile)
indexRouter.delete('/users/me', auth, deleteUser)


//user avatar

indexRouter.post('/users/me/avatar', auth, upload.single('avatar'), uploadAvatar, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

indexRouter.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


indexRouter.get('/users/:id/avatar',getAvatar)


//to-do list
indexRouter.post('/tasks', auth, createTask)
indexRouter.get('/tasks', auth, getAllTasks)
indexRouter.get('/tasks/:id', auth, getSpecificTask)
indexRouter.patch('/tasks/:id', auth, updateTask)
indexRouter.delete('/tasks/:id', auth, deleteTask)


//event
indexRouter.post('/mywedding',auth,createNewWedding)
indexRouter.get('/mywedding',auth,getWedding)
indexRouter.patch('/mywedding',auth,updateWedding)
indexRouter.delete('/mywedding',auth,deleteWedding)

//gallery routes

indexRouter.post('/gallery/uploadimage/:eventid', upload.array('images',12), uploadImage, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

indexRouter.get('/gallery/:eventid',getImages)

