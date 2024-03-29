import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { jwtConstants } from './constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@/users/events/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    private eventEmitter: EventEmitter2,
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const isPasswordMatched = await user.verifyPassword(password);
    if (isPasswordMatched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = user;

    return {
      access_token: this.jwtTokenService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const created = await this.usersService.create(createUserDto);
    if (created) {
      const userCreatedEvent = new UserCreatedEvent();
      userCreatedEvent.name = created.name;
      userCreatedEvent.username = created.username;
      userCreatedEvent.email = created.email;
      this.eventEmitter.emit('user.created', userCreatedEvent);
      return created;
    }
    return null;
  }

  async getUserProfile(req: Request): Promise<User> {
    const decodedUser = await this.verifiedUser(req);
    return await this.usersService.findOne(decodedUser.username);
  }

  async verifiedUser(req: Request): Promise<User> {
    const token = (<string>req.headers['authorization']).replace('Bearer ', '');
    const decodedUser = await this.jwtTokenService.verify(token, {
      secret: jwtConstants.secret,
    });
    return decodedUser;
  }
}
