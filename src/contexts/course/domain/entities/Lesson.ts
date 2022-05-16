import Video, { VideoAsJSON } from './Video';

type LessonAsJSON = {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  video: VideoAsJSON;
};

class Lesson {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _duration: number;
  private _thumbnailUrl: string;
  private _video: Video;

  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    thumbnailUrl: string,
    video: Video
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._duration = duration;
    this._thumbnailUrl = thumbnailUrl;
    this._video = video;
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

  get duration() {
    return this._duration;
  }
  set duration(duration: number) {
    this._duration = duration;
  }

  get thumbnailUrl() {
    return this._thumbnailUrl;
  }
  set thumbnailUrl(thumbnailUrl: string) {
    this._thumbnailUrl = thumbnailUrl;
  }

  get video() {
    return this._video;
  }
  set video(video: Video) {
    this._video = video;
  }

  get json(): LessonAsJSON {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      duration: this.duration,
      thumbnailUrl: this.thumbnailUrl,
      video: this.video.json,
    };
  }
}

export { LessonAsJSON };
export default Lesson;
