import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends mongoose.Document {
  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: string;
}

export const CommentScheme = SchemaFactory.createForClass(Comment);
