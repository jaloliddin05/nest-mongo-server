import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/enums/pricing_type.enum';
import { Shop } from '../shops/shop.schema';
import { User } from '../users/user.schema';
export type BusinessDocument = Business & Document;

@Schema({ collection: 'business' })
export class Business {

  @Prop({ maxlength: 120, required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  owner: string;

  @Prop({ type: [{ type: Types.ObjectId }]  })
  employees: User[];

  @Prop({ type: [] })
  role: [];

  @Prop({ type: [{ type: Types.ObjectId }] })
  shops: Shop[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BusinessSchema = SchemaFactory.createForClass(Business).set(
  'versionKey',
  false,
);
