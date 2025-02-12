import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

interface AdminProps {
  name: string
}

export class Admin extends Entity<AdminProps> {
  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id)

    return admin
  }
}
