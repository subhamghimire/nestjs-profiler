import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Observable, of } from 'rxjs';
import { Request, Response } from 'express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/avatars',
    filename: (req, file, cb) => {
      const fileName: string =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        '_avatar' +
        uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(id, { file: file.filename });
  }

  @Get(':id/avatar')
  findUserAvatar(@Param('id') id, @Res() res: Response) {
    return of(this.userService.getAvatar(id, res));
  }
}
