import Video from '../../../../domain/entities/Video';

class CreateLessonRequest {
  constructor(
    public readonly courseID: string,
    public readonly contentBlockID: string,
    public readonly title: string,
    public readonly description: string,
    public readonly duration: number,
    public readonly thumbnailUrl: string,
    public readonly video: Video
  ) {}
}

export default CreateLessonRequest;
