import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ maxlength: 64, required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId }] })
  variants: Variant[];

  @Prop({ default: () => uuidv4() })
  referenceId: string;

  @Prop({ type: Types.ObjectId })
  categoryId: { type: Types.ObjectId };

  @Prop({ default: false })
  trackStock: boolean;

  @Prop({ default: false })
  soldByWeight: boolean;
  

  @Prop({ default: false })
  isComposite: boolean;

  @Prop({ default: false })
  useProduction: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Components' }] })
  components: Component[];

  @Prop({ type: Types.ObjectId })
  primarySupplierId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  modifiersIds: Types.ObjectId;

  @Prop({ required: true })
  form: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image_url: string;

  @Prop({ required: true })
  option1Name: string;

  @Prop({ required: true })
  option2Name: string;

  @Prop({ required: true })
  option3Name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product).set(
  'versionKey',
  false,
);
