export interface User {
  id: string
  name: string
  /**
    * sha256 encoded
    *
    */
  secret: string
}

export type verifyResult = 'WRONG_PASSWORD' | 'USER_NOT_EXIST'

export interface UserStore {
  getUser(id: string): Promise<User | null>
  addUser(user: Partial<User>): Promise<User>
  verifyPassword(id: string, password: string): Promise<verifyResult>
}
