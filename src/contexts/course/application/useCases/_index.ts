import CreateContentBlockHandler from './CreateContentBlock/commands/CreateContentBlock.handler';
import ContentBlockWasCreatedHandler from './CreateContentBlock/events/ContentBlockWasCreated.handler';
import CreateCourseHandler from './CreateCourse/commands/CreateCourse.handler';
import CourseWasCreatedHandler from './CreateCourse/events/CourseWasCreated.handler';
import GetAllCoursesHandler from './GetAllCourses/queries/GetAllCourses.query';

export const CourseCommandHandlers = [
  CreateCourseHandler,
  CreateContentBlockHandler,
];
export const CourseQueryHandlers = [GetAllCoursesHandler];
export const CourseEventHandlers = [
  CourseWasCreatedHandler,
  ContentBlockWasCreatedHandler,
];
