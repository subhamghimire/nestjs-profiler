import { Document } from 'mongoose';

export interface IComment extends Document {
  readonly _id?: string;
  readonly title: string;
  readonly author: string;
}
