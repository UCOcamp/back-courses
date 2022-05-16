import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotAcceptableException,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response as res } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import saveCourseThumbnail from './helpers/saveCourseThumbnail';
import CreateCourseRequest from '../../application/useCases/CreateCourse/requests/CreateCourse.request';
import CreateCourseCommand from '../../application/useCases/CreateCourse/commands/CreateCourse.command';
import Course from '../../domain/entities/Course';

class CreateCourseDTO {
  @ApiProperty({
    type: String,
    description: 'Title of the course',
  })
  title!: string;

  @ApiProperty({
    type: String,
    description: 'Description of the course',
  })
  description!: string;

  @ApiProperty({
    type: String,
    description: 'Id of the Author of the course (uuid format)',
  })
  authorID!: string;

  @ApiProperty({
    type: Number,
    description: 'Aproximate duration (in days) of the course',
  })
  duration!: number;

  @ApiProperty({
    type: 'Image',
    format: 'binary',
    description: 'Thumbnail for the course (png/jpeg/jpg/svg)',
  })
  thumbnail!: Express.Multer.File;
}

@ApiTags('course')
@Controller('course')
class CreateCourseController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create a new course given all the params',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateCourseDTO,
  })
  @UseInterceptors(FileInterceptor('thumbnail', saveCourseThumbnail))
  async createCourse(
    @UploadedFile()
    thumbnail: Express.Multer.File,
    @Body()
    params: {
      title: string;
      description: string;
      authorID: string;
      duration: number;
    },
    @Response() response: res
  ) {
    const { title, description, authorID, duration } = params;

    if (!title || !description || !authorID || !duration) {
      throw new BadRequestException('Required params are missing!');
    }
    console.log(thumbnail);

    if (!thumbnail) {
      throw new NotAcceptableException(
        'Duplicated course or missing thumbnail!'
      );
    }

    const request = new CreateCourseRequest(
      title,
      description,
      thumbnail.path,
      authorID,
      duration
    );

    const course = await this.commandBus.execute<CreateCourseCommand, Course>(
      new CreateCourseCommand(request)
    );

    response
      .status(HttpStatus.CREATED)
      .send({ message: 'Course created succesfully', course: course.json });
  }
}

export default CreateCourseController;
