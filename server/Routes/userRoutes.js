import express from 'express'

import { clkerWebhooks, testDB } from '../Controllers/UserController.js'


const UserRouter = express.Router()

UserRouter.post('/webhooks',clkerWebhooks)
UserRouter.get('/test', testDB)


export default UserRouter