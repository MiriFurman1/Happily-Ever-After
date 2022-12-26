import {Router} from 'express'
import { addNewUser,updateUser,loginUser,getUserProfile} from '../controllers/users.controller.js';
import auth from "../middleware/auth.js"

export const indexRouter=Router()

indexRouter.post('/register',addNewUser)
indexRouter.post('/users/login',loginUser)
indexRouter.patch('/users/:id',auth, updateUser)
indexRouter.get('/users/me',auth,getUserProfile)
