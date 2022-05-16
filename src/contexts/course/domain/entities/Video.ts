type VideoAsJSON = {
  id: string;
  title: string;
  url: string;
};

class Video {
  private readonly _id: string;
  private _title: string;
  private readonly _url: string;

  constructor(id: string, title: string, url: string) {
    this._id = id;
    this._title = title;
    this._url = url;
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

  get url() {
    return this._url;
  }

  get json() {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
    };
  }
}

export { VideoAsJSON };
export default Video;
