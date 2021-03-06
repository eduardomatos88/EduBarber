import { v4 } from 'uuid'

import UserToken from '@modules/users/infra/typeorm/entities/UserTokens'

import IUserTokensRepository from '../IUserTokensRepository'

class FakeUsersTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    this.userTokens.push(userToken)
    return userToken
  }
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    )
    return userToken
  }
}

export default FakeUsersTokensRepository
