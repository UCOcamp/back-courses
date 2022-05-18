import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { Response as res } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import GetSubscriptionsFromCourseQuery from '../../application/useCases/GetSubscriptionsFromCourse/queries/GetSubscriptionsFromCourse.query';
import { GetSubscriptionsFromCourseResponse } from '../../application/useCases/GetSubscriptionsFromCourse/responses/GetSubscriptionsFromCourse.response';
import GetSubscriptionsFromCourseRequest from '../../application/useCases/GetSubscriptionsFromCourse/requests/GetSubscriptionsFromCourse.request';

@Controller('course/:id/subscriptions')
@ApiTags('Subscriptions')
class GetSubscriptionsFromCourseController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  @ApiOperation({
    summary: 'Get all the subscriptions from a existing course',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The subscriptions have been returned succesfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The course has not been found',
  })
  async getSubscriptionsFromCourse(
    @Param('id') id: string,
    @Response() response: res
  ) {
    const subscriptions = await this.queryBus.execute<
      GetSubscriptionsFromCourseQuery,
      GetSubscriptionsFromCourseResponse
    >(
      new GetSubscriptionsFromCourseQuery(
        new GetSubscriptionsFromCourseRequest(id)
      )
    );
    response.status(HttpStatus.OK).send(subscriptions.map((sub) => sub.json));
  }
}

export default GetSubscriptionsFromCourseController;
