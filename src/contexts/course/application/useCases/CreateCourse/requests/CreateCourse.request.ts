class CreateCourseRequest {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly thumbnailUrl: string,
    public readonly authorID: string,
    public readonly duration: number
  ) {}
}

export default CreateCourseRequest;
