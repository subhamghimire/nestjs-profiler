import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { NextFunction } from 'express';
import { Comment } from '@/comments/entities/comment.entity';

@Schema({ timestamps: true })
export class Article extends mongoose.Document {
  @Prop({
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
  })
  slug: string;

  @Prop({
    type: String,
    trim: true,
  })
  excerpt: string;

  @Prop({
    type: String,
    trim: true,
  })
  body: string;

  @Prop({
    type: String,
    ref: 'User',
    required: true,
  })
  author: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Comment' }])
  comments: Comment[];
}

const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.pre('save', async function (this: Article, next: NextFunction) {
  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');

  next();
});

export { ArticleSchema };
