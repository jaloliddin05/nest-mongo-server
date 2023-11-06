import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type RoleDocument = Role & Document;

@Schema({ collection: 'role' })
export class Role {
  @Prop({ maxlength: 64, required: true })
  name: string;

}

export const RolesSchema = SchemaFactory.createForClass(Role).set(
  'versionKey',
  false,
);
