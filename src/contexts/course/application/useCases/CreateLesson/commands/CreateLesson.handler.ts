import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import LessonFactory from '../../../../domain/entities/factories/LessonFactory';
import Lesson from '../../../../domain/entities/Lesson';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import LessonWasCreatedEvent from '../events/LessonWasCreated.event';
import CreateLessonCommand from './CreateLesson.command';

@CommandHandler(CreateLessonCommand)
class CreateLessonHandler implements ICommandHandler<CreateLessonCommand> {
  constructor(
    private readonly lessonFactory: LessonFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly courseRepository: MongoCourseEntityRepository
  ) {}

  async execute(command: CreateLessonCommand): Promise<Lesson> {
    const {
      courseID,
      contentBlockID,
      title,
      description,
      duration,
      thumbnailUrl,
      video,
    } = command.createLessonRequest;
    const course = this.eventPublisher.mergeObjectContext(
      await this.courseRepository.getOne(courseID)
    );
    const lesson = this.lessonFactory.create(
      title,
      description,
      duration,
      thumbnailUrl,
      video
    );

    course.addLessonToContentBlock(contentBlockID, lesson);
    await this.courseRepository.updateOne(course);
    course.apply(new LessonWasCreatedEvent(lesson.id));
    course.commit();
    return lesson;
  }
}

export default CreateLessonHandler;
