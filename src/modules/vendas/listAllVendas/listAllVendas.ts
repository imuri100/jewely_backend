import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Vendas } from '../models/Vendas'

class ListAllVendas {
  async handle (request: Request, response : Response) {
    try {
      const vendasRepository = getRepository(Vendas)
      const vendas = await vendasRepository.find({})

      return response.status(200).json(vendas)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

export { ListAllVendas }
