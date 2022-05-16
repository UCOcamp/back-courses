import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../../shared/domain/EntityFactory';
import ContentBlock from '../ContentBlock';
import Course from '../Course';
import RegisteredUser from '../RegisteredUser';

@Injectable()
class CourseFactory implements EntityFactory<Course> {
  create(
    title: string,
    description: string,
    thumbnailUrl: string,
    authorID: string,
    duration: number
  ): Course {
    return new Course(
      uuid(),
      title,
      description,
      thumbnailUrl,
      authorID,
      new Date(),
      duration,
      new Array<ContentBlock>(),
      new Array<RegisteredUser>()
    );
  }
}

export default CourseFactory;
