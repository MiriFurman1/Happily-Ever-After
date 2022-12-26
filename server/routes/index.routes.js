import {Router} from 'express'
import { addNewUser,updateUser} from '../controllers/users.controller.js'

export const indexRouter=Router()

indexRouter.post('/register',addNewUser)
indexRouter.patch('/users/:id', updateUser)