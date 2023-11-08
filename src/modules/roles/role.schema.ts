import { Document,Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permission } from '../permissions/permission.schema';
export type RoleDocument = Role & Document;

@Schema({ collection: 'role' })
export class Role {
  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  businessId: string;

  @Prop({ type: [{ type: Types.ObjectId }] })
  permission: Permission[];

}

export const RolesSchema = SchemaFactory.createForClass(Role).set(
  'versionKey',
  false,
);
