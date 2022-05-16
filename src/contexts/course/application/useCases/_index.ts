import CreateCourseHandler from './CreateCourse/commands/CreateCourse.handler';
import CourseWasCreatedHandler from './CreateCourse/events/CourseWasCreated.handler';
import GetAllCoursesHandler from './GetAllCourses/queries/GetAllCourses.query';

export const CourseCommandHandlers = [CreateCourseHandler];
export const CourseQueryHandlers = [GetAllCoursesHandler];
export const CourseEventHandlers = [CourseWasCreatedHandler];
