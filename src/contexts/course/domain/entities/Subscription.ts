type SubscriptionAsJSON = {
  id: string;
  userID: string;
  courseID: string;
  createdAt: Date;
  expirationDate: Date;
};

class Subscription {
  private readonly _id: string;
  private _userID: string;
  private _courseID: string;
  private readonly _createdAt: Date;
  private _expirationDate: Date;

  constructor(
    id: string,
    userID: string,
    courseID: string,
    createAt: Date,
    expirationDate: Date
  ) {
    this._id = id;
    this._userID = userID;
    this._courseID = courseID;
    this._createdAt = createAt;
    this._expirationDate = expirationDate;
  }

  get id() {
    return this._id;
  }

  get userID() {
    return this._userID;
  }
  set userID(userID: string) {
    this._userID = userID;
  }

  get courseID() {
    return this._courseID;
  }
  set courseID(courseID: string) {
    this._courseID = courseID;
  }

  get createdAt() {
    return this._createdAt;
  }

  get expirationDate() {
    return this._expirationDate;
  }
  set expirationDate(expirationDate: Date) {
    this._expirationDate = expirationDate;
  }

  get json() {
    return {
      id: this.id,
      userID: this.userID,
      courseID: this.courseID,
      createdAt: this.createdAt,
      expirationDate: this.expirationDate,
    };
  }
}

export { SubscriptionAsJSON };
export default Subscription;
