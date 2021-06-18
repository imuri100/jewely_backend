import express from 'express'
import UserRoutes from './user.routes'
import sessionsRoutes from './sessions.routes'

const routes = express.Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/users', UserRoutes)

export default routes
