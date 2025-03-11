import { UseCaseError } from '@/core/errors/use-case-error'

export class OrderNotFoundError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`Order with ID: '${id}' not found.`)
  }
}
