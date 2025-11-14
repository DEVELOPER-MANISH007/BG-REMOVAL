import express from 'express'

import { removeBgImage } from '../Controllers/ImageController.js'
import upload from '../Middlewares/Multer.js'

import authUser from '../Middlewares/Auth.js'


const imageRouter = express.Router()

imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)

export default imageRouter