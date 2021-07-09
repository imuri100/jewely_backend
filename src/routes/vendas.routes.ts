import express from 'express'
import { createVendasController } from '../modules/vendas/CreateVendas'
import { listAllVendasController } from '../modules/vendas/listAllVendas'

const VendasRoutes = express.Router()

VendasRoutes.post('/', async (request, response) => {
  return await createVendasController.handle(request, response)
})

VendasRoutes.get('/', async (request, response) => {
  return await listAllVendasController.handle(request, response)
})

export { VendasRoutes }
