import { Document } from 'mongoose';

export interface IVariants extends Document {
  readonly item_id: string;
  readonly sku: string;
  readonly reference_variant_id: string;
  readonly option1_value: string;
  readonly option2_value: string;
  readonly option3_value: string;
  readonly barcode: string;
  readonly cost: number;
  readonly purchase_cost: number;
  readonly default_pricing_type: string;
  readonly default_price: number;
  readonly stores: [];
}
