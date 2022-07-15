import { IsEmail, IsOptional, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsString()
  readonly username: string;
}
