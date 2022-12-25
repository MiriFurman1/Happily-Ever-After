import {Router} from 'express'
import { addNewUser} from '../controllers/users.controller.js'

export const indexRouter=Router()

indexRouter.post('/register',addNewUser)
