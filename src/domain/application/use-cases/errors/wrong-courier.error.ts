import { UseCaseError } from '@/core/errors/use-case-error'

export class CourierNOrderDontMatchError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`Order with ID: '${id}' belongs to another courier.`)
  }
}
