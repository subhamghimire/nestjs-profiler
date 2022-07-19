import { Document } from 'mongoose';
import { Category } from '@/categories/entities/category.entity';
import { Comment } from '@/comments/entities/comment.entity';

export interface IArticle extends Document {
  readonly _id?: string;
  readonly title: string;
  readonly excerpt: string;
  readonly body: string;
  readonly category: string extends Category ? Category : string;
  author: string;
  readonly comments: Comment[];
}
