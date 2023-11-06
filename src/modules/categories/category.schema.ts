import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../products/product.schema';
export type CategoryDocument = Category & Document;

@Schema({ collection: 'categories' })
export class Category {
  @Prop({ maxlength: 64 })
  image: string;

  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ maxlength: 64, required: true })
  sortOrder: string;

  @Prop({ type: Types.ObjectId })
  shopId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId }] })
  products: Product[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'versionKey',
  false,
);
