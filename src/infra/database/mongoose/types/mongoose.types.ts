/* eslint-disable @typescript-eslint/no-namespace */

export namespace MongooseTypes {
  export interface CreateUser {
    _id?: string
    name: string
    cpf: string
    password: string
    admin?: boolean
  }
}
