import CreateCourseHandler from './CreateCourse/commands/CreateCourse.handler';
import CourseWasCreatedHandler from './CreateCourse/events/CourseWasCreated.handler';

export const CourseCommandHandlers = [CreateCourseHandler];
export const CourseEventHandlers = [CourseWasCreatedHandler];
