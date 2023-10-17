import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common/role.enum';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ maxlength: 64, required: true })
  first_name: string;

  @Prop({ maxlength: 64, required: true })
  last_name: string;

  @Prop({ maxlength: 64 })
  business_mame: string;

  @Prop({ maxlength: 192, required: true })
  address: string;

  @Prop({ maxlength: 64 })
  city: string;

  @Prop({ maxlength: 64 })
  region: string;

  @Prop({ nullable: true, maxlength: 100 })
  email: string;

  @Prop({ nullable: true, maxlength: 100 })
  password: string;

  @Prop()
  refresh_token: string;

  @Prop({ unique: true, maxlength: 15, required: true })
  phone_number: string;

  @Prop({ type: String, enum: Role, required: true })
  role: Role;

  @Prop({ type: Types.ObjectId })
  shop_id: Types.ObjectId;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: 'defaultavatar.png' })
  photo: string;

  @Prop({ maxlength: 40, required: true })
  user_qr_code: string;

  @Prop({ maxlength: 255 })
  note: string;

  @Prop()
  first_visit: Date;

  @Prop()
  last_visit: Date;

  @Prop({ default: 0 })
  total_visits: number;

  @Prop({ default: 0 })
  total_spent: number;

  @Prop({ default: 0 })
  total_points: number;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
