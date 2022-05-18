import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { Response as res } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import GetContentBlocksFromCourseQuery from '../../application/useCases/GetContentBlocksFromCourse/queries/GetContentBlocksFromCourse.query';
import GetContentBlocksFromCourseRequest from '../../application/useCases/GetContentBlocksFromCourse/requests/GetContentBlocksFromCourse.request';
import { GetContentBlocksFromCourseResponse } from '../../application/useCases/GetContentBlocksFromCourse/responses/GetContentBlocksFromCourse.response';

@Controller('course/:id/content-blocks')
@ApiTags('Content Blocks')
class GetContentBlocksFromCourseController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  @ApiOperation({
    summary: 'Get all the ContentBlocks from a existing course',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The contentblocks have been returned succesfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The course has not been found',
  })
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
