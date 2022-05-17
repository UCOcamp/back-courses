import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import ContentBlock from '../../../../domain/entities/ContentBlock';
import ContentBlockFactory from '../../../../domain/entities/factories/ContentBlockFactory';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import ContentBlockWasCreatedEvent from '../events/ContentBlockWasCreated.event';
import CreateContentBlockCommand from './CreateContentBlock.command';

@CommandHandler(CreateContentBlockCommand)
class CreateContentBlockHandler
  implements ICommandHandler<CreateContentBlockCommand>
{
  constructor(
    private readonly contentBlockFactory: ContentBlockFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly courseRepository: MongoCourseEntityRepository
  ) {}

  async execute(command: CreateContentBlockCommand): Promise<ContentBlock> {
    const { courseID, title, description, duration } =
      command.createContentBlockRequest;
    const course = this.eventPublisher.mergeObjectContext(
      await this.courseRepository.getOne(courseID)
    );
    const contentBlock = this.contentBlockFactory.create(
      title,
      description,
      duration
    );
    course.addContentBlock(contentBlock);
    await this.courseRepository.updateOne(course);
    course.apply(new ContentBlockWasCreatedEvent(course.id, contentBlock.id));
    course.commit();
    return contentBlock;
  }
}

export default CreateContentBlockHandler;
