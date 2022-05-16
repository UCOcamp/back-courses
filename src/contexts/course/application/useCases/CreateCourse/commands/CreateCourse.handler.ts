import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import Course from '../../../../domain/entities/Course';
import CourseFactory from '../../../../domain/entities/factories/CourseFactory';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import CourseWasCreatedEvent from '../events/CourseWasCreated.event';
import CreateCourseCommand from './CreateCourse.command';

@CommandHandler(CreateCourseCommand)
class CreateCourseHandler implements ICommandHandler<CreateCourseCommand> {
  constructor(
    private readonly courseFactory: CourseFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly courseRepository: MongoCourseEntityRepository
  ) {}
  async execute(command: CreateCourseCommand): Promise<Course> {
    const { title, description, thumbnailUrl, authorID, duration } =
      command.createCourseRequest;
    const course = this.eventPublisher.mergeObjectContext(
      this.courseFactory.create(
        title,
        description,
        thumbnailUrl,
        authorID,
        duration
      )
    );
    await this.courseRepository.saveOne(course);
    course.apply(new CourseWasCreatedEvent(course.id));
    course.commit();
    return course;
  }
}

export default CreateCourseHandler;
