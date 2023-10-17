import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Items } from '../items/items.schema';
export type CategoriesDocument = Categories & Document;

@Schema({ collection: 'categories' })
export class Categories {
  @Prop({ maxlength: 64 })
  categories_image: string;

  @Prop({ maxlength: 64, required: true })
  category_name: string;

  @Prop({ default: true })
  category_status: boolean;

  @Prop({ maxlength: 64, required: true })
  category_sort_order: string;

  @Prop({ type: Types.ObjectId })
  shop_id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Items' }] })
  products: Items[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories).set(
  'versionKey',
  false,
);
