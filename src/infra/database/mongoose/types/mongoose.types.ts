/* eslint-disable @typescript-eslint/no-namespace */

export namespace MongooseTypes {
  export interface CreateUser {
    _id: string
    name: string
    cpf: string
    password: string
    admin?: boolean
    githubUsername?: string
  }

  export interface CreateOrder {
    _id: string
    recipientID: string
    courierID?: string
    status: 'pending' | 'withdrawn' | 'delivered' | 'returned'
    returnReason?: string
    photoUrl?: string
    createdAt: Date
    updatedAt?: Date
  }

  export interface CreateRecipient {
    _id: string
    name: string
  }
}
