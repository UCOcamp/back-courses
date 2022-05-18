import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import { GetContentBlocksFromCourseResponse } from '../responses/GetContentBlocksFromCourse.response';
import GetContentBlocksFromCourseQuery from './GetContentBlocksFromCourse.query';

@QueryHandler(GetContentBlocksFromCourseQuery)
class GetContentBlocksFromCourseHandler
  implements IQueryHandler<GetContentBlocksFromCourseQuery>
{
  constructor(private readonly courseRepository: MongoCourseEntityRepository) {}
  async execute(
    query: GetContentBlocksFromCourseQuery
  ): Promise<GetContentBlocksFromCourseResponse> {
    const { courseID } = query.getContentBlocksFromCourseRequest;
    const course = await this.courseRepository.getOne(courseID);
    return course.contentBlocks;
  }
}

export default GetContentBlocksFromCourseHandler;
