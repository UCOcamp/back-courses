import { AggregateRoot } from '@nestjs/cqrs';
import ContentBlock, { ContentBlockAsJSON } from './ContentBlock';
import RegisteredUser, { RegisteredUserAsJSON } from './RegisteredUser';

type CourseAsJSON = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  authorID: string;
  createdAt: Date;
  duration: number;
  contentBlocks: ContentBlockAsJSON[];
  registeredUsers: RegisteredUserAsJSON[];
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
  private _registeredUsers: RegisteredUser[];

  constructor(
    id: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    authorID: string,
    createdAt: Date,
    duration: number,
    contentBlocks: ContentBlock[],
    registeredUsers: RegisteredUser[]
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
    this._registeredUsers = registeredUsers;
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

  get registeredUsers() {
    return this._registeredUsers;
  }
  set registeredUsers(registeredUsers: RegisteredUser[]) {
    this._registeredUsers = registeredUsers;
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
      registeredUsers: this.registeredUsers.map((user) => user.json),
    };
  }
}
export { CourseAsJSON };
export default Course;
