import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { join } from 'path';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = new this.userModel({ ...createUserDto, password: hash });
    return user.save();
  }

  update(id: string, UpdateUserDto: UpdateUserDto) {
    const existingUser = this.userModel
      .findOneAndUpdate({ _id: id }, { $set: UpdateUserDto }, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return existingUser;
  }

  async uploadAvatar(id: string, file) {
    return await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { avatar: file.file } },
        { new: true },
      )
      .exec();
  }

  async getAvatar(id: string, res) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    return res.sendFile(join(process.cwd(), 'uploads/avatars/' + user.avatar));
  }
}
