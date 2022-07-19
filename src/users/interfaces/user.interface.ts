import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly _id?: string;
  readonly name: string;
  readonly email: string;
  readonly role?: string[];
  password: string;
  readonly username: string;
  readonly avatar?: string;
}
