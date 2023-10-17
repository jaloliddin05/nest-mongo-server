import { Document } from 'mongoose';

export interface IComponents extends Document {
  readonly variant_id: string;
  readonly quantity: number;
}
