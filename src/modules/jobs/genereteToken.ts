import { sign } from 'jsonwebtoken'
import { EntityRepository, getRepository } from 'typeorm'
import AuthConfig from '../../config/auth'
import { Users } from '../users/models/Users'
import { Payload } from '../users/services/AuthenticateUsers.Services'

@EntityRepository(Users)
class GenerateToken {
  async execute (user :Users, payload : Payload, refresh? : boolean) : Promise<string> {
    const userRepository = getRepository(Users)
    let token : string = ''
    if (!refresh) {
      token = sign(
        payload,
        AuthConfig.JWT.secret, {
          subject: user.id.toString(),
          expiresIn: AuthConfig.JWT.expiresIn

        })
      await userRepository.save({ ...user, reset_token: token, reset_token_expires: token })
    }

    if (refresh) {
      token = sign(
        payload,
        AuthConfig.JWT.secret, {
          subject: user.id.toString(),
          expiresIn: AuthConfig.JWT.expiresIn_Refresh

        })

      await userRepository.save({ ...user, reset_token: token })
    }

    return token
  }
}

export { GenerateToken }
