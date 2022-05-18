import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { Response as res } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import GetSubscriptionsFromCourseQuery from '../../application/useCases/GetSubscriptionsFromCourse/queries/GetSubscriptionsFromCourse.query';
import { GetSubscriptionsFromCourseResponse } from '../../application/useCases/GetSubscriptionsFromCourse/responses/GetSubscriptionsFromCourse.response';
import GetSubscriptionsFromCourseRequest from '../../application/useCases/GetSubscriptionsFromCourse/requests/GetSubscriptionsFromCourse.request';

@Controller('course/:id/subscriptions')
@ApiTags('course')
class GetSubscriptionsFromCourseController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
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
