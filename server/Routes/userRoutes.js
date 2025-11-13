import express from 'express'

import { clkerWebhooks } from '../Controllers/UserController.js'


const UserRouter = express.Router()

UserRouter.post('/webhooks',clkerWebhooks)


export default UserRouter