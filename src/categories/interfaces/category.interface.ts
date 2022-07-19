import { Document } from 'mongoose';

export interface ICategory extends Document {
  readonly _id?: string;
  readonly name: string;
  readonly author: string;
}
