import express from 'express'
import { UserRoutes } from './user.routes'
import sessionsRoutes from './sessions.routes'
import { materiaRoutes } from './materia.routes'

const routes = express.Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/users', UserRoutes)
routes.use('/materias', materiaRoutes)

export default routes
