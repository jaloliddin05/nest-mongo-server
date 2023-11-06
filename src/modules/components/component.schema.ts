import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ComponentDocument = Component & Document;

@Schema({ collection: 'components' })
export class Component {
  @Prop({ type: Types.ObjectId })
  variantId: string;

  @Prop()
  quantity: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ComponentSchema = SchemaFactory.createForClass(Component).set(
  'versionKey',
  false,
);
