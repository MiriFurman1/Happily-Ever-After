import { Router } from 'express'
import { addNewUser, updateUser, loginUser, logout, logoutAll, getUserProfile, deleteUser } from '../controllers/users.controller.js';
import { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import auth from "../middleware/auth.js"
import multer from 'multer'
import sharp from 'sharp'
import { User } from "../models/user.model.js";

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
const upload = multer({
    limits: {
        fileSize: 5 * 1000 * 1000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


indexRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    if (!req.file || !req.file.buffer) {
  return res.status(400).send({ error: 'No file was provided' });
}

const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


indexRouter.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


indexRouter.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


//to-do list
indexRouter.post('/tasks', auth, createTask)
indexRouter.get('/tasks', auth, getAllTasks)
indexRouter.get('/tasks/:id', auth, getSpecificTask)
indexRouter.patch('/tasks/:id', auth, updateTask)
indexRouter.delete('/tasks/:id', auth, deleteTask)
