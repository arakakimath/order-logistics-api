import { UseCaseError } from '@/core/errors/use-case-error'

export class DeliveryPersonNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Delivery person not found.')
  }
}
