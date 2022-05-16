import Lesson from '../entities/Lesson';

interface LessonEntityRepository {
  getOne(id: string): Promise<Lesson>;
  getAll(): Promise<Lesson[]>;
  saveOne(lesson: Lesson): Promise<void>;
  updateOne(lesson: Lesson): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default LessonEntityRepository;
