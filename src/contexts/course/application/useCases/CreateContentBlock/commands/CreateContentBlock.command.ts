import CreateContentBlockRequest from '../requests/CreateContentBlock.request';

class CreateContentBlockCommand {
  constructor(
    public readonly createContentBlockRequest: CreateContentBlockRequest
  ) {}
}

export default CreateContentBlockCommand;
