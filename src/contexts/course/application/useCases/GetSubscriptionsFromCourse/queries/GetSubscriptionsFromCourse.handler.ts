import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import { GetSubscriptionsFromCourseResponse } from '../responses/GetSubscriptionsFromCourse.response';
import GetSubscriptionsFromCourseQuery from './GetSubscriptionsFromCourse.query';

@QueryHandler(GetSubscriptionsFromCourseQuery)
class GetSubscriptionsFromCourseHandler
  implements IQueryHandler<GetSubscriptionsFromCourseQuery>
{
  constructor(private readonly courseRepository: MongoCourseEntityRepository) {}
  async execute(
    query: GetSubscriptionsFromCourseQuery
  ): Promise<GetSubscriptionsFromCourseResponse> {
    const { courseID } = query.getSubscriptionsFromCourseRequest;
    const course = await this.courseRepository.getOne(courseID);
    return course.subscriptions;
  }
}

export default GetSubscriptionsFromCourseHandler;
