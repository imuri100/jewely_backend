import path from 'path'
import ejs from 'ejs'
import pdf from 'html-pdf'
import crypto from 'crypto'
import { Pecas } from '../pecas/models/Pecas'
import { Users } from '../users/models/Users'
import { AppError } from '../../erros/AppError'
function GerarPDF (peca : Pecas, user? : Users) {
  const filePath = path.join(__dirname, '..', '..', 'views', 'print.ejs')
  ejs.renderFile(filePath, { pecas: peca, author: user?.name }, (err, html) => {
    if (err) {
      throw new AppError(err.message)
    }
    const options = {
      height: '11.25in',
      width: '8.5in',
      header: {
        height: '20mm'
      },
      footer: {
        height: '20mm'
      }
    }
    const fileName = crypto.randomBytes(10).toString('hex')

    pdf.create(html, options).toFile(`./pdf/${peca.name}-${fileName}.pdf`, (err, data) => {
      if (err) {
        throw new AppError(err.message)
      }
      return "'Arquivo gerado com sucesso'"
    })
  })
}

export { GerarPDF }
