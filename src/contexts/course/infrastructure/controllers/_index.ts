import CreateContentBlockController from './CreateContentBlock.controller';
import CreateCourseController from './CreateCourse.controller';
import CreateLessonController from './CreateLesson.controller';
import CreateSubscriptionController from './CreateSubscription.controller';
import GetAllCoursesController from './GetAllCourses.controller';

export const CourseControllers = [
  CreateCourseController,
  GetAllCoursesController,
  CreateContentBlockController,
  CreateSubscriptionController,
  CreateLessonController,
];
