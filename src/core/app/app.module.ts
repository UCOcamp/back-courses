import { Module } from '@nestjs/common';
import DatabaseModule from '../database/mongo/mongo.module';
import MulterConfigModule from './multer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import CourseModule from '../../contexts/course/infrastructure/modules/Courses.module';

@Module({
  imports: [
    DatabaseModule,
    MulterConfigModule,
    CourseModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '/files'),
      serveRoot: '/files',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
