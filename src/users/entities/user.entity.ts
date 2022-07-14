import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
