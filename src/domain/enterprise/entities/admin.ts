import { Entity } from "../../../core/entity";
import { UniqueEntityID } from "../../../core/unique-entity-id";

interface AdminProps {
  name: string
}

export class Admin extends Entity<AdminProps> {
  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id)

    return admin
  }
}