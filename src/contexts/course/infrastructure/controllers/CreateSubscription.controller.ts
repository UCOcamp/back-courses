import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response as res } from 'express';
import CreateSubscriptionCommand from '../../application/useCases/CreateSubscription/commands/CreateSubscription.command';
import CreateSubscriptionRequest from '../../application/useCases/CreateSubscription/requests/CreateSubscription.request';
import Subscription from '../../domain/entities/Subscription';

class CreateSubscriptionDTO {
  @ApiProperty({
    type: String,
    description: 'ID of the course of the subscription',
  })
  courseID!: string;

  @ApiProperty({
    type: String,
    description: 'ID of the user of the subscription',
  })
  userID!: string;

  @ApiProperty({
    type: String,
    description: 'Expiration date of the subscription',
  })
  expirationDate!: Date;
}

@ApiTags('subscription')
@Controller('subscription')
class CreateSubscriptionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create a new subscription for a existing course and user',
  })
  @ApiBody({
    type: CreateSubscriptionDTO,
  })
  async createSubscription(
    @Body()
    params: CreateSubscriptionDTO,
    @Response()
    response: res
  ) {
    const { courseID, userID, expirationDate } = params;
    if (!courseID || !userID || !expirationDate)
      throw new BadRequestException('Required params are missing!');
    const request = new CreateSubscriptionRequest(
      courseID,
      userID,
      expirationDate
    );
    const subscription = await this.commandBus.execute<
      CreateSubscriptionCommand,
      Subscription
    >(new CreateSubscriptionCommand(request));

    response.status(HttpStatus.CREATED).send({
      message: 'Subscription created succesfully',
      subscription: subscription.json,
    });
  }
}

export default CreateSubscriptionController;
