import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import CourseWasCreatedEvent from './CourseWasCreated.event';

@EventsHandler(CourseWasCreatedEvent)
class CourseWasCreatedHandler implements IEventHandler<CourseWasCreatedEvent> {
  async handle({ id }: CourseWasCreatedEvent) {
    console.log(`Created course with id ${id}`);
  }
}

export default CourseWasCreatedHandler;
