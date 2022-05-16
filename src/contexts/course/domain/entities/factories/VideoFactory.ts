import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../../shared/domain/EntityFactory';
import Video from '../Video';

Injectable();
class VideoFactory implements EntityFactory<Video> {
  create(title: string, url: string): Video {
    return new Video(uuid(), title, url);
  }
}

export default VideoFactory;
