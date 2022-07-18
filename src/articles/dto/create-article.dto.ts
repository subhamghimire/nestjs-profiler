import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly excerpt: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly category: string;
}
