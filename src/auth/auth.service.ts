import { Injectable } from '@nestjs/common';
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.userId };

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

    const user = await this.usersService.findOne(decodedUser.username);
    return user;
  }
}
