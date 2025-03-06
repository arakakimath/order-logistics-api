import { GetDeliveryPersonUseCase } from '@/domain/application/use-cases/users/get-delivery-person'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { MongooseDeliveryPersonMapper } from '@/infra/database/mongoose/mappers/mongoose-delivery-person.mapper'
import { Controller, NotFoundException, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('/users/:cpf')
@ApiTags('Users')
export class GetUserController {
  constructor(private getUseCase: GetDeliveryPersonUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get a delivery person.' })
  @ApiParam({ name: 'cpf' })
  @ApiResponse({
    status: 200,
    description: 'Delivery person successfully got.',
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery person not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request unauthorized.',
  })
  async handle(
    @Param('cpf') cpf: string, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser({ admin: true }) _: never,
  ) {
    const result = await this.getUseCase.execute({
      cpf,
    })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message)
    }

    const { deliveryPerson } = result.value

    return {
      delivery_person: MongooseDeliveryPersonMapper.toMongoose(deliveryPerson),
    }
  }
}
