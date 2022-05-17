import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import ContentBlockWasCreatedEvent from './ContentBlockWasCreated.event';

@EventsHandler(ContentBlockWasCreatedEvent)
class ContentBlockWasCreatedHandler
  implements IEventHandler<ContentBlockWasCreatedEvent>
{
  async handle({ courseID, id }: ContentBlockWasCreatedEvent) {
    console.log(
      `Created ContentBlock with id ${id} and attached to course with id ${courseID}`
    );
  }
}

export default ContentBlockWasCreatedHandler;
