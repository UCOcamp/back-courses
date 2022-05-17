class CreateContentBlockRequest {
  constructor(
    public readonly courseID: string,
    public readonly title: string,
    public readonly description: string,
    public readonly duration: number
  ) {}
}

export default CreateContentBlockRequest;
