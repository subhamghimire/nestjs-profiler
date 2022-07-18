import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Request } from 'express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/avatars',
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      const fileName: string =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        '_avatar' +
        uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only images are allowed!'), false);
  }
  cb(null, true);
};
