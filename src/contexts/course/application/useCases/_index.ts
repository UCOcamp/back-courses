import CreateContentBlockHandler from './CreateContentBlock/commands/CreateContentBlock.handler';
import ContentBlockWasCreatedHandler from './CreateContentBlock/events/ContentBlockWasCreated.handler';
import CreateCourseHandler from './CreateCourse/commands/CreateCourse.handler';
import CourseWasCreatedHandler from './CreateCourse/events/CourseWasCreated.handler';
import CreateLessonHandler from './CreateLesson/commands/CreateLesson.handler';
import LessonWasCreatedHandler from './CreateLesson/events/LessonWasCreated.handler';
import CreateSubscriptionHandler from './CreateSubscription/commands/CreateSubscription.handler';
import SubscriptionWasCreatedHandler from './CreateSubscription/events/SubscriptionWasCreated.handler';
import GetAllCoursesHandler from './GetAllCourses/queries/GetAllCourses.handler';
import GetContentBlocksFromCourseHandler from './GetContentBlocksFromCourse/queries/GetContentBlocksFromCourse.handler';

export const CourseCommandHandlers = [
  CreateCourseHandler,
  CreateContentBlockHandler,
  CreateSubscriptionHandler,
  CreateLessonHandler,
];
export const CourseQueryHandlers = [
  GetAllCoursesHandler,
  GetContentBlocksFromCourseHandler,
];
export const CourseEventHandlers = [
  CourseWasCreatedHandler,
  ContentBlockWasCreatedHandler,
  SubscriptionWasCreatedHandler,
  LessonWasCreatedHandler,
];
