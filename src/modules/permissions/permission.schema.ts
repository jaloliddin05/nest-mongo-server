import { Document ,Types} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PermissionDocument = Permission & Document;

@Schema({ collection: 'permission' })
export class Permission {
    @Prop({ maxlength: 64, required: true })
    name: string;

    @Prop({ type: Types.ObjectId })
    roleId: string;
    
    @Prop({ type: Types.ObjectId })
    permissionCategoryId: string;

}

export const PermissionsSchema = SchemaFactory.createForClass(Permission).set(
  'versionKey',
  false,
);
