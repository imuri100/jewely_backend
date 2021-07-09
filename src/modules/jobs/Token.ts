import { Users } from '../users/models/Users'
import AuthConfig from '../../config/auth'
import { sign } from 'jsonwebtoken'

function Token (user : Users) {
  const token = sign({
    cargo: user.cargo,
    email: user.email
  }, AuthConfig.JWT.secret, {
    subject: user.id.toString(),
    expiresIn: AuthConfig.JWT.expiresIn

  })
  return token
}
export { Token }
