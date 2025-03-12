import { UseCaseError } from '@/core/errors/use-case-error'

export class MustBeAdminError extends Error implements UseCaseError {
  constructor() {
    super(`Only admin users can perfom this action.`)
  }
}
