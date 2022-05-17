import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import SubscriptionWasCreatedEvent from './SubscriptionWasCreated.event';

@EventsHandler(SubscriptionWasCreatedEvent)
class SubscriptionWasCreatedHandler
  implements IEventHandler<SubscriptionWasCreatedEvent>
{
  async handle({ courseID, userID, id }: SubscriptionWasCreatedEvent) {
    console.log(
      `Subscription was created succesfully for course ${courseID} and user ${userID}, with ID: ${id}`
    );
  }
}

export default SubscriptionWasCreatedHandler;
