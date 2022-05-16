import Course from '../entities/Course';

interface CourseEntityRepository {
  getOne(id: string): Promise<Course>;
  getAll(): Promise<Course[]>;
  saveOne(course: Course): Promise<void>;
  updateOne(course: Course): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default CourseEntityRepository;
