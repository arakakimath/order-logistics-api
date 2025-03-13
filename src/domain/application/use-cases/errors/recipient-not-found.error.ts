import { UseCaseError } from '@/core/errors/use-case-error'

export class RecipientNotFoundError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`Recipient with ID: '${id}' not found.`)
  }
}
