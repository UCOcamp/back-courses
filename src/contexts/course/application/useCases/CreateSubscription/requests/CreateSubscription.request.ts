class CreateSubscriptionRequest {
  constructor(
    public readonly courseID: string,
    public readonly userID: string,
    public readonly expirationDate: Date
  ) {}
}

export default CreateSubscriptionRequest;
