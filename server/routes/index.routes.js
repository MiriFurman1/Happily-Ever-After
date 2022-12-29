import { Router } from 'express'
import { addNewUser, updateUser, loginUser, logout, logoutAll, getUserProfile, deleteUser,  uploadAvatar,getAvatar} from '../controllers/users.controller.js';
import { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import {createNewWedding,getWedding,updateWedding,deleteWedding,uploadImage} from '../controllers/wedding.controller.js'


import auth from "../middleware/auth.js"
import upload from "../middleware/upload.js"
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



// const upload = multer({
//     limits: {
//         fileSize: 5 * 1000 * 1000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image file'));
//         }
//         cb(undefined, true);
//     },
// });

// indexRouter.post('/add/image', upload.array('photos'), async (req, res) => {
//     try {
//         if (!req.files || !req.files.length) {
//             return res.status(400).send({ error: 'No files were provided' });
//         }

//         // loop through the uploaded files
//         for (const file of req.files) {
//             // resize and convert the image data to PNG format
//             const buffer = await sharp(file.buffer)
//                 .resize({ width: 1500, height: 1000 })
//                 .jpeg()
//                 .toBuffer();


//             const gallery = new Gallery({
//                 // user: req.user._id,
//                 // wedding: req.wedding._id,
//                 photo: {
//                     data: buffer,
//                     contentType: 'image/jpeg',
//                 },
//             });

//             await gallery.save();
//         }

//         res.send();
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });
