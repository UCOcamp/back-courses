import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../../shared/domain/EntityFactory';
import Lesson from '../Lesson';
import Video from '../Video';

@Injectable()
class LessonFactory implements EntityFactory<Lesson> {
  create(
    title: string,
    description: string,
    duration: number,
    thumbnailUrl: string,
    video: Video
  ): Lesson {
    return new Lesson(
      uuid(),
      title,
      description,
      duration,
      thumbnailUrl,
      video
    );
  }
}

export default LessonFactory;
