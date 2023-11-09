import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../infra/shared/enums/role.enum';
import { Shop } from '../shops/shop.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ minlength:3, maxlength: 64, required: true })
  firstName: string;

  @Prop({ minlength:3,maxlength: 64, required: true })
  lastName: string;

  @Prop({ type: Types.ObjectId })
  business: Types.ObjectId;
  
  @Prop({minlength:3, maxlength: 192, required: true })
  address: string;

  @Prop({minlength:3, maxlength: 64 })
  city: string; 

  @Prop({minlength:3, maxlength: 64 })
  region: string;

  @Prop({  maxlength: 100 })
  email: string;

  @Prop({ nullable: true, maxlength: 100 })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ unique: true, maxlength: 15, required: true })
  phoneNumber: string;

  @Prop({ type: String, enum: Role, default:Role.MERCHANT }) 
  role: Role;

  
  @Prop({ type: [{ type: Types.ObjectId }] })
  shop: Shop[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 'defaultavatar.png' })
  photo: string;

  @Prop({minlength:4, maxlength: 40, required: true })
  userQrCode: string;

  @Prop({minlength:3, maxlength: 255 })
  note: string;

  @Prop()
  firstVisit: Date;

  @Prop()
  lastVisit: Date;

  @Prop({ default: 0 })
  totalVisits: number;

  @Prop({ default: 0 })
  totalSpent: number;

  @Prop({ default: 0 })
  totalPoints: number;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
