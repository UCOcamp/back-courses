import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import {
  CourseCommandHandlers,
  CourseEventHandlers,
  CourseQueryHandlers,
} from '../../application/useCases/_index';
import ContentBlockFactory from '../../domain/entities/factories/ContentBlockFactory';
import CourseFactory from '../../domain/entities/factories/CourseFactory';
import SubscriptionFactory from '../../domain/entities/factories/SubscriptionFactory';
import { CourseControllers } from '../controllers/_index';
import MongoCourseEntityRepository from '../persistance/mongo/repositories/CourseEntityRepository';
import CourseSchemaFactory from '../persistance/mongo/schemaFactories/Course.schemaFactory';
import CourseSchema from '../persistance/mongo/schemas/Course.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CourseSchema.name,
        schema: SchemaFactory.createForClass(CourseSchema),
      },
    ]),
  ],
  controllers: [...CourseControllers],
  providers: [
    CourseFactory,
    ContentBlockFactory,
    SubscriptionFactory,
    MongoCourseEntityRepository,
    CourseSchemaFactory,
    ...CourseCommandHandlers,
    ...CourseQueryHandlers,
    ...CourseEventHandlers,
  ],
})
class CourseModule {}
export default CourseModule;
