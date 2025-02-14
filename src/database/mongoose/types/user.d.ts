export interface CreateUser {
  name: string
  cpf: string
  password: string
  admin?: boolean
}