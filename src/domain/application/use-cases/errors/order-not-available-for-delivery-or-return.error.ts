import { UseCaseError } from '@/core/errors/use-case-error'

export class OrderNotAvailableForDeliveryOrReturnError
  extends Error
  implements UseCaseError
{
  constructor(id: string) {
    super(
      `Order with ID: '${id}' was not withdrawn for delivering or returning.`,
    )
  }
}
