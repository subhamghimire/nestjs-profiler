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
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UsersService } from '@/users/users.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Observable, of } from 'rxjs';
import { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update user data' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiOperation({ summary: 'Upload user avatar' })
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(id, { file: file.filename });
  }

  @Get(':id/avatar')
  @ApiOperation({ summary: 'Get user avatar' })
  findUserAvatar(@Param('id') id, @Res() res: Response) {
    return of(this.userService.getAvatar(id, res));
  }
}
