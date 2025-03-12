import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidPhotoTypeError extends Error implements UseCaseError {
  constructor() {
    super(`Photos must be either jpg, png or jpeg.`)
  }
}
