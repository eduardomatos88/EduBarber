import { compare, hash } from 'bcryptjs'

import IHashProvider from '../models/IHashProvider'

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatched = await compare(payload, hashed)
    return passwordMatched
  }
}

export default BCryptHashProvider
