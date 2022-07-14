import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isPasswordMatched = await user.verifyPassword(password);
    if (isPasswordMatched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user._doc.username, sub: user.userId };

    return {
      access_token: this.jwtTokenService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async getUserProfile(req: Request): Promise<User> {
    const token = (<string>req.headers['authorization']).replace('Bearer ', '');
    const decodedUser = this.jwtTokenService.verify(token, {
      secret: jwtConstants.secret,
    });

    return await this.usersService.findOne(decodedUser.username);
  }
}
