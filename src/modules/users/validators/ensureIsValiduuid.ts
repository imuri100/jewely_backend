import { validate } from 'uuid'
import { AppError } from '../../../erros/AppError'

function ensureIsValidUuid (id: string): void {
  const isValidUuid = validate(id)

  if (!isValidUuid) { throw new AppError(' user id is not  the type uuid') }
}

export { ensureIsValidUuid }
