import { AggregateRoot } from '@nestjs/cqrs';
import ContentBlock, { ContentBlockAsJSON } from './ContentBlock';
import Subscription, { SubscriptionAsJSON } from './Subscription';

type CourseAsJSON = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  authorID: string;
  createdAt: Date;
  duration: number;
  contentBlocks: ContentBlockAsJSON[];
  subscriptions: SubscriptionAsJSON[];
};

class Course extends AggregateRoot {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _thumbnailUrl: string;
  private _authorID: string;
  private readonly _createdAt: Date;
  private _duration: number;
  private _contentBlocks: ContentBlock[];
  private _subscriptions: Subscription[];

  constructor(
    id: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    authorID: string,
    createdAt: Date,
    duration: number,
    contentBlocks: ContentBlock[],
    subscriptions: Subscription[]
  ) {
    super();
    this._id = id;
    this._title = title;
    this._description = description;
    this._thumbnailUrl = thumbnailUrl;
    this._authorID = authorID;
    this._createdAt = createdAt;
    this._duration = duration;
    this._contentBlocks = contentBlocks;
    this._subscriptions = subscriptions;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }

  get description() {
    return this._description;
  }
  set description(description: string) {
    this._description = description;
  }

  get thumbnailUrl() {
    return this._thumbnailUrl;
  }
  set thumbnailUrl(thumbnailUrl: string) {
    this._thumbnailUrl = thumbnailUrl;
  }

  get authorID() {
    return this._authorID;
  }
  set authorID(authorID: string) {
    this._authorID = authorID;
  }

  get createdAt() {
    return this._createdAt;
  }

  get duration() {
    return this._duration;
  }
  set duration(duration: number) {
    this._duration = duration;
  }

  get contentBlocks() {
    return this._contentBlocks;
  }
  set contentBlocks(contentBlocks: ContentBlock[]) {
    this._contentBlocks = contentBlocks;
  }
  addContentBlock(contentBlock: ContentBlock) {
    this._contentBlocks.push(contentBlock);
  }

  get subscriptions() {
    return this._subscriptions;
  }
  set subscriptions(subscriptions: Subscription[]) {
    this._subscriptions = subscriptions;
  }
  addSubscription(subcription: Subscription) {
    this._subscriptions.push(subcription);
  }

  get json(): CourseAsJSON {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      authorID: this.authorID,
      duration: this.duration,
      thumbnailUrl: this.thumbnailUrl,
      contentBlocks: this.contentBlocks.map((block) => block.json),
      subscriptions: this.subscriptions.map((subs) => subs.json),
    };
  }
}
export { CourseAsJSON };
export default Course;
