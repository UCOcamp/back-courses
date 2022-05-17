import CreateSubscriptionRequest from '../requests/CreateSubscription.request';

class CreateSubscriptionCommand {
  constructor(
    public readonly createSubscriptionRequest: CreateSubscriptionRequest
  ) {}
}

export default CreateSubscriptionCommand;
