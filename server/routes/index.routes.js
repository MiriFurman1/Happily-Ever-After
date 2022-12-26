import {Router} from 'express'
import { addNewUser,updateUser,loginUser} from '../controllers/users.controller.js'

export const indexRouter=Router()

indexRouter.post('/register',addNewUser)
indexRouter.patch('/users/:id', updateUser)
indexRouter.post('/users/login',loginUser)