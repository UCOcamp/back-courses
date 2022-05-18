import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { Response as res } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import GetContentBlocksFromCourseQuery from '../../application/useCases/GetContentBlocksFromCourse/queries/GetContentBlocksFromCourse.query';
import GetContentBlocksFromCourseRequest from '../../application/useCases/GetContentBlocksFromCourse/requests/GetContentBlocksFromCourse.request';
import { GetContentBlocksFromCourseResponse } from '../../application/useCases/GetContentBlocksFromCourse/responses/GetContentBlocksFromCourse.response';

@Controller('course/:id/content-blocks')
@ApiTags('course')
class GetContentBlocksFromCourseController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  async getContentBlocksFromCourse(
    @Param('id') id: string,
    @Response() response: res
  ) {
    const contentBlocks = await this.queryBus.execute<
      GetContentBlocksFromCourseQuery,
      GetContentBlocksFromCourseResponse
    >(
      new GetContentBlocksFromCourseQuery(
        new GetContentBlocksFromCourseRequest(id)
      )
    );
    response.status(HttpStatus.OK).send(contentBlocks.map((cb) => cb.json));
  }
}

export default GetContentBlocksFromCourseController;
