import express from 'express'
import puppetter from 'puppeteer'
const routesPdf = express.Router()

const passengers = [
  {
    name: 'Samuel',
    flightNumber: 7869,
    time: '18h00'
  },

  {
    name: 'Zita',
    flightNumber: 6657,
    time: '18h00'
  },
  {
    name: 'Mayk',
    flightNumber: 5863,
    time: '18h00'
  }
]

routesPdf.get('/pdfs', async (request, response) => {
  const browser = await puppetter.launch()
  const page = await browser.newPage()

  await page.goto('', {
    waitUntil: 'networkidle0'
  })
  const pdf = await page.pdf({
    path: './pdf/filename.pdf', // Saves pdf to disk.
    format: 'a4',
    printBackground: true,
    margin: { // Word's default A4 margins
      top: '2.54cm',
      bottom: '2.54cm',
      left: '2.54cm',
      right: '2.54cm'
    }
  })

  await browser.close()

  response.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })

  return response.send(pdf)
})

routesPdf.get('/', (request, response) => {
  console.log(request.protocol + ':' request.headers.host)
  return response.render('print', { passengers })
})

export { routesPdf }
