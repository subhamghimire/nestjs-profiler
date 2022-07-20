import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class EmailDto {
  @ApiProperty({ description: 'Recipient' })
  @IsEmail()
  recipient: string;

  @ApiProperty({ description: 'Subject of mail' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Content of mail' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Date to send mail' })
  @IsDateString()
  date: string;
}
