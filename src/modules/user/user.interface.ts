import { Document, Types } from 'mongoose';
import { Role } from 'src/common/role.enum';

export interface IUser extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly business_name: string;
  readonly address: string;
  readonly city: string;
  readonly region: string;
  readonly email: string | null;
  readonly password: string | null;
  readonly refresh_noken: string;
  readonly phone_number: string;
  readonly role: Role;
  readonly shop_id: Types.ObjectId;
  readonly is_active: boolean;
  readonly photo: string;
  readonly user_qr_code: string;
  readonly note: string;
  readonly first_visit: Date;
  readonly last_visit: Date;
  readonly total_visits: number;
  readonly total_spent: number;
  readonly total_points: number;
}
