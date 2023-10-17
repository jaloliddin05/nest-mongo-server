import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variants } from '../variants/variants.schema';
import { Components } from '../components/components.schema';
export type ItemsDocument = Items & Document;

@Schema({ collection: 'items' })
export class Items {
  @Prop({ maxlength: 64, required: true })
  item_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Variants' }] })
  variants: Variants[];

  @Prop({ default: () => uuidv4() })
  reference_id: string;

  @Prop({ type: Types.ObjectId })
  category_id: { type: Types.ObjectId; ref: 'Categories' };

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  sold_by_weight: boolean;

  @Prop({ default: false })
  is_composite: boolean;

  @Prop({ default: false })
  use_production: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Components' }] })
  components: Components[];

  @Prop({ type: Types.ObjectId })
  primary_supplier_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  tax_ids: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  modifiers_ids: Types.ObjectId;

  @Prop({ required: true })
  form: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image_url: string;

  @Prop({ required: true })
  option1_name: string;

  @Prop({ required: true })
  option2_name: string;

  @Prop({ required: true })
  option3_name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ItemsSchema = SchemaFactory.createForClass(Items).set(
  'versionKey',
  false,
);
