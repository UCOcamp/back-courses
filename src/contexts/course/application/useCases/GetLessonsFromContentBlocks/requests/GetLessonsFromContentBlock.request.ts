class GetLessonsFromContentBlockRequest {
  constructor(
    public readonly courseID: string,
    public readonly contentBlockID: string
  ) {}
}

export default GetLessonsFromContentBlockRequest;
