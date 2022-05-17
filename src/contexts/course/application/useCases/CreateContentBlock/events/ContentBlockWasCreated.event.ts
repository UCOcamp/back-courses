class ContentBlockWasCreatedEvent {
  constructor(public readonly courseID: string, public readonly id: string) {}
}

export default ContentBlockWasCreatedEvent;
