import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Password field is required' })
  @MinLength(5, {
    message:
      '$property is too short. Minimal length is $constraint1 characters',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsString()
  readonly username: string;
}
