import { rejects } from 'assert'
import { error } from 'console'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
import { TokenPayLoad } from '~/models/requests/User.requests'
import { loadEnvConfig } from './config'
loadEnvConfig()
export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublickey }: { token: string; secretOrPublickey: string }) => {
  return new Promise<TokenPayLoad>((resolve, reject) => {
    jwt.verify(token, secretOrPublickey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as TokenPayLoad)
    })
  })
}
