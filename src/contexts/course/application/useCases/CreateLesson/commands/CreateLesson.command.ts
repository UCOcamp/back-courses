import CreateLessonRequest from '../requests/CreateLesson.request';

class CreateLessonCommand {
  constructor(public readonly createLessonRequest: CreateLessonRequest) {}
}

export default CreateLessonCommand;
