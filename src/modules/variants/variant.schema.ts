import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/enums/pricing_type.enum';
export type VariantDocument = Variant & Document;

@Schema({ collection: 'variants' })
export class Variant {
  @Prop({ type: Types.ObjectId })
  productId: string;

  @Prop({ default: () => uuidv4() })
  referenceVariantId: string;

  @Prop({ maxlength: 40, required: true })
  sku: string;

  @Prop({ maxlength: 20, required: true })
  option1Value: string;

  @Prop({ maxlength: 20, required: true })
  option2Value: string;

  @Prop({ maxlength: 20, required: true })
  option3Value: string;

  @Prop({ maxlength: 128, required: true })
  barcode: string;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  purchaseCost: number;

  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  defaultPricingType: PricingType;

  @Prop()
  defaultPrice: number;

  @Prop({ type: [] })
  shops: [];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const VariantSchema = SchemaFactory.createForClass(Variant).set(
  'versionKey',
  false,
);
