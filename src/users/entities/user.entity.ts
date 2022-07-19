import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop()
  username: string;

  verifyPassword: Function;

  role: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.verifyPassword = async function (
  this: User,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export { UserSchema };
