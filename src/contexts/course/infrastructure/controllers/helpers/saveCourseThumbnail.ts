import { diskStorage } from 'multer';
import fs from 'fs';
import path, { join } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const validMimeTypes: string[] = ['image/svg+xml', 'image/png', 'image/jpeg'];

const saveCourseThumbnail: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let { title } = req.body;
      if (!title) title = '';

      const baseDir = './files';

      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
      }

      const courseBaseDir = join(baseDir, '/courses');
      if (!fs.existsSync(courseBaseDir)) {
        fs.mkdirSync(courseBaseDir);
      }

      const thumbnailDir =
        courseBaseDir + '/' + title.replace(/ /g, '').toLowerCase();
      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir);
      }

      cb(null, thumbnailDir);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = 'thumbnail' + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    let { title } = req.body;
    if (!title) title = '';

    const thumbnailDir =
      './files/courses/' + title.replace(/ /g, '').toLowerCase();

    const fileExtension = path.extname(file.originalname);
    const fileName = 'thumbnail' + fileExtension;

    const fullPath = thumbnailDir + '/' + fileName;
    validMimeTypes.includes(file.mimetype) && !fs.existsSync(fullPath)
      ? cb(null, true)
      : cb(null, false);
  },
};

export default saveCourseThumbnail;
