import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import { GetLessonsFromContentBlockResponse } from '../responses/GetLessonsFromContentBlock.response';
import GetLessonsFromContentBlockQuery from './GetLessonsFromContentBlock.query';

@QueryHandler(GetLessonsFromContentBlockQuery)
class GetLessonsFromContentBlockHandler
  implements IQueryHandler<GetLessonsFromContentBlockQuery>
{
  constructor(private readonly courseRepository: MongoCourseEntityRepository) {}
  async execute(
    query: GetLessonsFromContentBlockQuery
  ): Promise<GetLessonsFromContentBlockResponse> {
    const { courseID, contentBlockID } =
      query.getLessonsFromContentBlockRequest;
    const course = await this.courseRepository.getOne(courseID);
    const contentBlock = course.getContentBlock(contentBlockID);
    return contentBlock.lessons;
  }
}

export default GetLessonsFromContentBlockHandler;
