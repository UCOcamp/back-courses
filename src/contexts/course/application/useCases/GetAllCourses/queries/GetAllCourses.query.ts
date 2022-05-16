import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import { GetAllCoursesResponse } from '../responses/GetAllCourses.response';
import GetAllCoursesQuery from './GetAllCourses.handler';

@QueryHandler(GetAllCoursesQuery)
class GetAllCoursesHandler implements IQueryHandler<GetAllCoursesQuery> {
  constructor(private readonly courseRepository: MongoCourseEntityRepository) {}
  async execute(): Promise<GetAllCoursesResponse> {
    const courses = await this.courseRepository.getAll();
    return courses;
  }
}

export default GetAllCoursesHandler;
