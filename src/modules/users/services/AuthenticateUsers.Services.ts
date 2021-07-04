import { compare } from 'bcrypt'
import { getRepository, EntityRepository } from 'typeorm'
import { Users } from '../models/Users'
import { AppError } from '../../../erros/AppError'
import { GenerateToken } from '../../jobs/genereteToken'

interface RequestUser {
    email: string;
    password: string;
}

// interface ResponseUser {
//     user: Users;
//     token: string;
// }

interface ResponseUser {
    user: {
        id: string;
        name: string,
        cargo: 'artesao' | 'administrador';
        email: string;
        avatar: string;
        created_At: Date;
        updated_At: Date;
    },
    token: string ;
    old_Token? : string
}

interface Payload {
    cargo: 'artesao' | 'administrador';
    email: string;
}

@EntityRepository(Users)
class AuthenticateUserServices {
  public async execute ({
    email,
    password
  }: RequestUser): Promise<ResponseUser> {
    const userRepository = getRepository(Users)

    const user = await userRepository.findOne({
      where: { email: email.trim() }
    })

    if (!user) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }

    const comparedPassword = await compare(password, user.password)
    if (!comparedPassword) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }
    const { id, name, cargo, email: Email, avatar, created_At, updated_At } = user
    const payload : Payload = {
      cargo,
      email
    }
    const genreted = new GenerateToken()

    const token = await genreted.execute(user, payload)

    return {
      user: {
        id,
        name,
        cargo,
        email: Email,
        avatar,
        created_At,
        updated_At
      },
      token
    }
  }

  public async refreshToken (data : string) : Promise<ResponseUser> {
    const userRepository = getRepository(Users)

    const user = await userRepository.findOne({
      where: { reset_token_expires: data }
    })

    if (!user) {
      throw new AppError('invalid refresh Token', 401)
    }
    const { id, name, cargo, email, avatar, created_At, updated_At, reset_token_expires } = user
    const payload : Payload = {
      cargo,
      email
    }
    const genreted = new GenerateToken()
    const refresh = true
    const refreshToken = await genreted.execute(user, payload, refresh)
    return {
      token: refreshToken,
      old_Token: reset_token_expires,
      user: {
        id,
        name,
        cargo,
        email,
        avatar,
        created_At,
        updated_At
      }
    }
  }
}

export { AuthenticateUserServices, Payload, ResponseUser }
