import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const validMimeTypes: string[] = [
  'video/mp4',
  'video/avi',
  'image/svg+xml',
  'image/png',
];

const saveLessonFiles: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const { courseTitle, contentBlockID, title } = req.body;
      if (!courseTitle || !contentBlockID)
        throw new BadRequestException('Required params are missing!');

      const courseDir = `./files/courses/${courseTitle
        .replace(/ /g, '')
        .toLowerCase()}`;
      if (!fs.existsSync(courseDir))
        throw new NotFoundException('Course not found');

      const blockDir = courseDir + `/${contentBlockID}`;
      if (!fs.existsSync(blockDir)) fs.mkdirSync(blockDir);

      const lessonDir = blockDir + '/' + title.replace(/ /g, '').toLowerCase();
      if (!fs.existsSync(lessonDir)) fs.mkdirSync(lessonDir);

      cb(null, lessonDir);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      let { title } = req.body;
      if (!title) title = '';
      const fileName = title.replace(/ /g, '').toLowerCase() + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const { courseID, contentBlockID, title } = req.body;
    const titleFormatted = title.replace(/ /g, '').toLowerCase();
    const lessonDir = `./files/courses/${courseID}/${contentBlockID}/${titleFormatted}`;

    validMimeTypes.includes(file.mimetype) && !fs.existsSync(lessonDir)
      ? cb(null, true)
      : cb(null, false);
  },
};

export default saveLessonFiles;
