import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: 'Article Title' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Article Excerpt' })
  @IsString()
  readonly excerpt: string;

  @ApiProperty({ description: 'Article body' })
  @IsString()
  readonly body: string;

  @ApiProperty({ description: 'Category of article' })
  @IsString()
  readonly category: string;
}
