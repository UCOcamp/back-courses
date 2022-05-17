import Lesson, { LessonAsJSON } from './Lesson';

type ContentBlockAsJSON = {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessons: LessonAsJSON[];
};

class ContentBlock {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _duration: number;
  private _lessons: Lesson[];

  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    lessons: Lesson[]
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._duration = duration;
    this._lessons = lessons;
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

  get lessons() {
    return this._lessons;
  }
  set lessons(lessons: Lesson[]) {
    this._lessons = lessons;
  }
  addLesson(lesson: Lesson) {
    this._lessons.push(lesson);
  }

  get json(): ContentBlockAsJSON {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      duration: this.duration,
      lessons: this.lessons.map((lesson) => lesson.json),
    };
  }
}
export { ContentBlockAsJSON };
export default ContentBlock;
