import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
}
