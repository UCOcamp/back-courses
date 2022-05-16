import CreateCourseRequest from '../requests/CreateCourse.request';

class CreateCourseCommand {
  constructor(public readonly createCourseRequest: CreateCourseRequest) {}
}

export default CreateCourseCommand;
