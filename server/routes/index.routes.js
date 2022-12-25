import {Router} from 'express'
import { getPlants , addPlants} from '../controllers/plants.controller.js'

export const indexRouter=Router()

indexRouter.get('/plants',getPlants)
indexRouter.post('/plants/add',addPlants)