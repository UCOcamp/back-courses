import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import BaseMongoEntityRepository from '../../../../../shared/data/BaseMongoEntityRepository';
import Course from '../../../../domain/entities/Course';
import CourseEntityRepository from '../../../../domain/repositories/CourseEntityRepository';
import CourseSchemaFactory from '../schemaFactories/Course.schemaFactory';
import CourseSchema from '../schemas/Course.schema';

@Injectable()
class MongoCourseEntityRepository
  extends BaseMongoEntityRepository<CourseSchema, Course>
  implements CourseEntityRepository
{
  constructor(
    @InjectModel(CourseSchema.name) courseModel: Model<CourseSchema>,
    courseSchemaFactory: CourseSchemaFactory
  ) {
    super(courseModel, courseSchemaFactory);
  }
  async getOne(id: string): Promise<Course> {
    const courses = await this.find({ id: id });
    if (courses.length > 1)
      throw new InternalServerErrorException('Duplicated IDs');
    if (courses.length === 0) throw new NotFoundException('Course Not Found!');
    return courses[0];
  }
  async getAll(): Promise<Course[]> {
    return await this.findAll();
  }
  async saveOne(course: Course): Promise<void> {
    await this.create(course);
  }
  async updateOne(course: Course): Promise<void> {
    await this.findOneAndUpdateById(course.id, course);
  }
  async deleteOne(id: string): Promise<void> {
    await this.entityModel.deleteOne({ id: id });
  }
}

export default MongoCourseEntityRepository;
