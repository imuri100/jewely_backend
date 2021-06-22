/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authCofig from '../../../config/auth'

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticade (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: ' JWT Token is missing' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authCofig.JWT.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub

    }
    next()
  } catch (error) {
    return response.status(401).json({ error: 'Invalid JWT Token' })
  }
}

export { ensureAuthenticade }
