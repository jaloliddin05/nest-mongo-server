import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/enums/pricing_type.enum';
export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  pricingType: PricingType;

  @Prop()
  name: string;

@Prop()
  price: number;

  @Prop({ default: true })
  availableForSale: boolean;

  @Prop({ default: null })
  optimalStock: number;

  @Prop({ default: null })
  lowStock: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop).set(
  'versionKey',
  false,
);
