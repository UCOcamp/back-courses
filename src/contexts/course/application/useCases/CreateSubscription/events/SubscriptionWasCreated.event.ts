class SubscriptionWasCreatedEvent {
  constructor(
    public readonly courseID: string,
    public readonly userID: string,
    public readonly id: string
  ) {}
}

export default SubscriptionWasCreatedEvent;
