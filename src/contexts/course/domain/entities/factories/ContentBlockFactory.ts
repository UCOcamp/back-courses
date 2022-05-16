import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../../shared/domain/EntityFactory';
import ContentBlock from '../ContentBlock';
import Lesson from '../Lesson';

@Injectable()
class ContentBlockFactory implements EntityFactory<ContentBlock> {
  create(title: string, description: string, duration: number) {
    return new ContentBlock(
      uuid(),
      title,
      description,
      duration,
      new Array<Lesson>()
    );
  }
}

export default ContentBlockFactory;
