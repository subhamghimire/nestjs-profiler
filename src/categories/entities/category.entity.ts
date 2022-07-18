import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Category extends mongoose.Document {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: string;
}

export const CategoryScheme = SchemaFactory.createForClass(Category);
