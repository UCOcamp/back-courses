import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Response,
  NotAcceptableException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response as res } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import saveLessonFiles from './helpers/saveLessonFiles';
import CreateLessonRequest from '../../application/useCases/CreateLesson/requests/CreateLesson.request';
import CreateLessonCommand from '../../application/useCases/CreateLesson/commands/CreateLesson.command';
import Lesson from '../../domain/entities/Lesson';

class CreateLessonDTO {
  @ApiProperty({
    type: String,
    description: 'ID of the course',
  })
  courseID!: string;

  @ApiProperty({
    type: String,
    description: 'Title of the course',
  })
  courseTitle!: string;

  @ApiProperty({
    type: String,
    description: 'ID of the contentblock',
  })
  contentBlockID!: string;

  @ApiProperty({
    type: String,
    description: 'Title of the Lesson',
  })
  title!: string;

  @ApiProperty({
    type: String,
    description: 'Description of the Lesson',
  })
  description!: string;

  @ApiProperty({
    type: Number,
    description: 'Aproximate duration (in days) of the Lesson',
  })
  duration!: number;

  @ApiProperty({
    type: 'Image',
    format: 'binary',
    description: 'Thumbnail for the Lesson (png/jpeg/jpg/svg)',
  })
  thumbnail!: Express.Multer.File;

  @ApiProperty({
    type: 'Video',
    format: 'binary',
    description: 'Video of the Lesson (mp4/avi)',
  })
  video!: Express.Multer.File;
}

class CreateLessonDTOWithoutBinarys {
  courseID!: string;
  courseTitle!: string;
  contentBlockID!: string;
  title!: string;
  description!: string;
  duration!: number;
}

@ApiTags('Lessons')
@Controller('lesson')
class CreateLessonController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiOperation({
    summary:
      'Create a new Lesson given all the params and attach it to a contentBlock',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateLessonDTO,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      saveLessonFiles
    )
  )
  async createLesson(
    @UploadedFiles()
    files: { thumbnail: Express.Multer.File[]; video: Express.Multer.File[] },
    @Body() params: CreateLessonDTOWithoutBinarys,
    @Response() response: res
  ) {
    const { courseID, contentBlockID, title, description, duration } = params;
    if (!courseID || !contentBlockID || !title || !description || !duration)
      throw new BadRequestException('Required params are missing!');

    const { thumbnail, video } = files;
    if (!video || !thumbnail) {
      throw new NotAcceptableException(
        'Duplicated or missing Video / Thumbnail!'
      );
    }

    const request = new CreateLessonRequest(
      courseID,
      contentBlockID,
      title,
      description,
      duration,
      thumbnail[0].path,
      video[0].path
    );

    const lesson = await this.commandBus.execute<CreateLessonCommand, Lesson>(
      new CreateLessonCommand(request)
    );

    response
      .status(HttpStatus.CREATED)
      .send({ message: 'Lesson created succesfully', lesson: lesson.json });
  }
}

export default CreateLessonController;
