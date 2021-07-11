import express from 'express'

const routesPdf = express.Router()
const pecas = {
  name: 'Petra 1',
  stock_User_id: [
    '95e85ed9-abdb-4813-807c-929790bdb96c'
  ],
  user_id: '3714d822-a8a4-465b-8cca-ef8a3d6f1f55',
  materia_reference: [
    {
      quantity: 2,
      reference: 332
    }
  ],
  id: '229faf77-b24e-4a32-9f99-5d2a7c869437',
  created_At: '2021-07-10T00:16:40.010Z',
  updated_At: '2021-07-10T00:16:40.010Z'
}

routesPdf.get('/', (request, response) => {

//   return response.render('print', { passengers })
})

export { routesPdf }
