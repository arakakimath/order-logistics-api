import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  recipientID: string
  courierID?: string
  status: 'pending' | 'withdrawn' | 'delivered' | 'returned'
  photoUrl?: string
  createdAt: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get recipientID() {
    return this.props.recipientID
  }

  set recipientID(recipientID: string) {
    this.props.recipientID = recipientID
    this.touch()
  }

  get courierID() {
    return this.props.courierID
  }

  set courierID(courierID: string | undefined) {
    this.props.courierID = courierID
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(status: 'pending' | 'withdrawn' | 'delivered' | 'returned') {
    this.props.status = status
    this.touch()
  }

  get photoUrl() {
    return this.props.photoUrl
  }

  set photoUrl(photoUrl: string | undefined) {
    this.props.photoUrl = photoUrl
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrderProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'pending',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
