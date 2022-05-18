import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { Response as res } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import GetLessonsFromContentBlockQuery from '../../application/useCases/GetLessonsFromContentBlocks/queries/GetLessonsFromContentBlock.query';
import { GetLessonsFromContentBlockResponse } from '../../application/useCases/GetLessonsFromContentBlocks/responses/GetLessonsFromContentBlock.response';
import GetLessonsFromContentBlockRequest from '../../application/useCases/GetLessonsFromContentBlocks/requests/GetLessonsFromContentBlock.request';

@Controller('course/:courseID/content-block/:contentBlockID/lessons')
@ApiTags('Lessons')
class GetLessonsFromContentBlockController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  @ApiOperation({
    summary: 'Get all the Lessons from a existing ContentBlock',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The lessons have been returned succesfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The course or the contentblock has not been found',
  })
  async getLessonsFromContentBlock(
    @Param('courseID') courseID: string,
    @Param('contentBlockID') contentBlockID: string,
    @Response() response: res
  ) {
    const lessons = await this.queryBus.execute<
      GetLessonsFromContentBlockQuery,
      GetLessonsFromContentBlockResponse
    >(
      new GetLessonsFromContentBlockQuery(
        new GetLessonsFromContentBlockRequest(courseID, contentBlockID)
      )
    );
    response.status(HttpStatus.OK).send(lessons.map((lesson) => lesson.json));
  }
}

export default GetLessonsFromContentBlockController;
