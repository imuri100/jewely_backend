import express from 'express'
import { UserRoutes } from './user.routes'
import sessionsRoutes from './sessions.routes'
import { materiaRoutes } from './materia.routes'
import { stoskUserRoutes } from './StockUser.routes'
import { ensureAuthenticade } from '../modules/users/middleware/ensureAuthenticad'
import { refreshToken } from './refreshToken'

const routes = express.Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/refresh_token', refreshToken)
routes.use('/users', UserRoutes)
routes.use('/materias', ensureAuthenticade, materiaRoutes)
routes.use('/stockuser', ensureAuthenticade, stoskUserRoutes)

export default routes
