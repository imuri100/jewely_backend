import { validate } from 'uuid'
import { AppError } from '../../../erros/AppError'

function ensureIsValidUuid (id: string): void {
  const isValidUuid = validate(id)

  if (!isValidUuid) { throw new AppError(' this ID passed is not assignable to parameter of type UUID ') }
}

export { ensureIsValidUuid }
