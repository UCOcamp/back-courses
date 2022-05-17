import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import SubscriptionFactory from '../../../../domain/entities/factories/SubscriptionFactory';
import Subscription from '../../../../domain/entities/Subscription';
import MongoCourseEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/CourseEntityRepository';
import SubscriptionWasCreatedEvent from '../events/SubscriptionWasCreated.event';
import CreateSubscriptionCommand from './CreateSubscription.command';

@CommandHandler(CreateSubscriptionCommand)
class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    private readonly subscriptionFactory: SubscriptionFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly courseRepository: MongoCourseEntityRepository
  ) {}
  async execute(command: CreateSubscriptionCommand): Promise<Subscription> {
    const { courseID, userID, expirationDate } =
      command.createSubscriptionRequest;
    const course = this.eventPublisher.mergeObjectContext(
      await this.courseRepository.getOne(courseID)
    );
    const subscription = this.subscriptionFactory.create(
      userID,
      courseID,
      expirationDate
    );

    course.addSubscription(subscription);
    await this.courseRepository.updateOne(course);
    course.apply(
      new SubscriptionWasCreatedEvent(course.id, userID, subscription.id)
    );
    course.commit();
    return subscription;
  }
}

export default CreateSubscriptionHandler;
