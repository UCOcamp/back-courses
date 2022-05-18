import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Response as res } from 'express';
import CreateContentBlockCommand from '../../application/useCases/CreateContentBlock/commands/CreateContentBlock.command';
import CreateContentBlockRequest from '../../application/useCases/CreateContentBlock/requests/CreateContentBlock.request';
import ContentBlock from '../../domain/entities/ContentBlock';
class CreateContentBlockDTO {
  @ApiProperty({
    type: String,
    description: 'ID of the course that contains the contentblock',
  })
  courseID!: string;

  @ApiProperty({
    type: String,
    description: 'Title of the contentblock',
  })
  title!: string;

  @ApiProperty({
    type: String,
    description: 'Description of the contentblock',
  })
  description!: string;

  @ApiProperty({
    type: Number,
    description: 'Aproximate duration (in days) of the content block',
  })
  duration!: number;
}

@ApiTags('Content Blocks')
@Controller('content-block')
class CreateContentBlockController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/')
  @ApiOperation({
    summary: 'Create a new content-block and attach it to a existing course',
  })
  @ApiBody({
    type: CreateContentBlockDTO,
  })
  @ApiCreatedResponse({
    status: 201,
    description:
      'Content block has been succesfully created and attached to the given course',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Required params are missing!',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Course not found!!',
  })
  async createContentBlock(
    @Body()
    params: CreateContentBlockDTO,
    @Response() response: res
  ) {
    const { courseID, title, description, duration } = params;
    if (!courseID || !title || !description || !duration)
      throw new BadRequestException('Required params are missing!');
    const request = new CreateContentBlockRequest(
      courseID,
      title,
      description,
      duration
    );
    const contentBlock = await this.commandBus.execute<
      CreateContentBlockCommand,
      ContentBlock
    >(new CreateContentBlockCommand(request));

    response.status(HttpStatus.CREATED).send({
      message: 'Content block created succesfully',
      contentBlock: contentBlock.json,
    });
  }
}

export default CreateContentBlockController;
