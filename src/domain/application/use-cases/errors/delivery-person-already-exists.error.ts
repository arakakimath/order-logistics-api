import { UseCaseError } from '@/core/errors/use-case-error'

export class DeliveryPersonAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Delivery person already registered.')
  }
}
