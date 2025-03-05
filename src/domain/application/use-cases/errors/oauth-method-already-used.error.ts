import { UseCaseError } from '@/core/errors/use-case-error'

export class OAuthMethodAlreadyUsedError extends Error implements UseCaseError {
  constructor() {
    super('This OAuth2 method is already used for other account.')
  }
}
