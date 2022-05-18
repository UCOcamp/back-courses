import { Controller, Get, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import GetAllCoursesQuery from '../../application/useCases/GetAllCourses/queries/GetAllCourses.query';
import GetAllCoursesRequest from '../../application/useCases/GetAllCourses/requests/GetAllCourses.request';
import {
  GetAllCoursesResponse,
  GetAllCoursesResponseJSON,
} from '../../application/useCases/GetAllCourses/responses/GetAllCourses.response';

@Controller('courses')
@ApiTags('courses')
class GetAllCoursesController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  @ApiOperation({
    summary: 'Get all the courses saved',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Courses returned succesfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Courses not found!',
  })
  async getAllCourses(): Promise<GetAllCoursesResponseJSON> {
    const courses = await this.queryBus.execute<
      GetAllCoursesQuery,
      GetAllCoursesResponse
    >(new GetAllCoursesQuery(new GetAllCoursesRequest()));
    if (courses.length === 0) throw new NotFoundException('Courses not found!');
    return courses.map((course) => course.json);
  }
}

export default GetAllCoursesController;
