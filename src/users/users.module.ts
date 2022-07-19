import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/entities/user.entity';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreatedListener } from '@/users/listeners/user-created.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, UserCreatedListener],
  exports: [UsersService],
})
export class UsersModule {}
