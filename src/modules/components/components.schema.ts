import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ComponentsDocument = Components & Document;

@Schema({ collection: 'components' })
export class Components {
  @Prop({ type: Types.ObjectId })
  variant_id: string;

  @Prop()
  quantity: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ComponentsSchema = SchemaFactory.createForClass(Components).set(
  'versionKey',
  false,
);
