import { Injectable } from '@nestjs/common';
import EntitySchemaFactory from '../../../../../shared/data/EntitySchemaFactory';
import ContentBlock from '../../../../domain/entities/ContentBlock';
import Course from '../../../../domain/entities/Course';
import Lesson from '../../../../domain/entities/Lesson';
import Subscription from '../../../../domain/entities/Subscription';
import Video from '../../../../domain/entities/Video';
import CourseSchema from '../schemas/Course.schema';

@Injectable()
class CourseSchemaFactory implements EntitySchemaFactory<CourseSchema, Course> {
  createEntityFromSchema(entitySchema: CourseSchema): Course {
    const contentBlocks = entitySchema.contentBlocks.map((block) => {
      const lessons = block.lessons.map((lesson) => {
        const video = new Video(
          lesson.video.id,
          lesson.video.title,
          lesson.video.url
        );
        return new Lesson(
          lesson.id,
          lesson.title,
          lesson.description,
          lesson.duration,
          lesson.thumbnailUrl,
          video
        );
      });
      return new ContentBlock(
        block.id,
        block.title,
        block.description,
        block.duration,
        lessons
      );
    });
    const subscriptions = entitySchema.subscriptions.map((sub) => {
      return new Subscription(
        sub.id,
        sub.userID,
        sub.courseID,
        sub.createdAt,
        sub.expirationDate
      );
    });
    return new Course(
      entitySchema.id,
      entitySchema.title,
      entitySchema.description,
      entitySchema.thumbnailUrl,
      entitySchema.authorID,
      entitySchema.createdAt,
      entitySchema.duration,
      contentBlocks,
      subscriptions
    );
  }
  createSchemaFromEntity(entity: Course): CourseSchema {
    return entity.json;
  }
}

export default CourseSchemaFactory;
