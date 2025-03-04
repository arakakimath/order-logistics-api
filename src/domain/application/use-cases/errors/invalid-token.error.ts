import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidTokenError extends Error implements UseCaseError {
  constructor() {
    super(`Token is not valid.`)
  }
}
