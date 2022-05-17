import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import LessonWasCreatedEvent from './LessonWasCreated.event';

@EventsHandler(LessonWasCreatedEvent)
class LessonWasCreatedHandler implements IEventHandler<LessonWasCreatedEvent> {
  async handle({ id }: LessonWasCreatedEvent) {
    console.log(`Lesson was created sucesfully with id ${id}`);
  }
}

export default LessonWasCreatedHandler;
