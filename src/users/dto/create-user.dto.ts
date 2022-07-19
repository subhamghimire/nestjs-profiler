import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'User name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password field is required' })
  @MinLength(5, {
    message:
      '$property is too short. Minimal length is $constraint1 characters',
  })
  readonly password: string;

  @ApiProperty({ description: 'User avatar' })
  @IsOptional()
  @IsString()
  readonly avatar: string;

  @ApiProperty({ description: "User's username" })
  @IsString()
  readonly username: string;
}
