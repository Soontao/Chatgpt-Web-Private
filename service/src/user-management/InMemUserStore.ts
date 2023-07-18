import * as uuid from 'uuid'
import type { User, UserStore, verifyResult } from './UserStore'

export class InMemUserStore implements UserStore {
  store = new Map<string, User>()
  constructor() {
    // entry list, [['user_id', { 'id': '' ... }]]
    if (process.env.IN_MEM_USER_ENTRIES)
      this.store = new Map(JSON.parse(process.env.IN_MEM_USER_ENTRIES))
  }

  async getUser(id: string): Promise<User | null> {
    if (this.store.has(id))
      return this.store.get(id)
    return null
  }

  async addUser(user: Partial<User>): Promise<User> {
    if (user.id && this.store.has(user.id))
      throw new Error('user already existed')
    user.id = uuid.v4()
    this.store.set(user.id, user as User)
    return user as User
  }

  async verifyPassword(id: string, password: string): Promise<verifyResult> {
    if (!this.store.has(id))
      return 'USER_NOT_EXIST'
    if (this.store?.get(id)?.secret !== password)
      return 'WRONG_PASSWORD'
  }
}
