import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard, JwtAuthGuard } from '@/auth/guards';
import { Public, Roles } from '@/common/decorators';
import { Role } from '@/common/enums/role.enum';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.authService.getUserProfile(req);
  }
}
