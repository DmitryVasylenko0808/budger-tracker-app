import { diskStorage } from 'multer';
import { extname } from 'path';

export const uploadsStorage = diskStorage({
  destination: './uploads/avatars',
  filename(req, file, callback) {
    callback(null, generateFilename(file));
  },
});

const generateFilename = (file: Express.Multer.File) => {
  const name = `${Date.now()}${extname(file.originalname)}`;

  return name;
};
