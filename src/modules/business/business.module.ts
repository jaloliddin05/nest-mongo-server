import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from './business.schema';
import { ShopsService } from '../shops/shops.service';
import { Shop, ShopSchema } from '../shops/shop.schema';
  
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }])
  ],
  controllers: [BusinessController],
  exports: [BusinessService],
  providers: [BusinessService,ShopsService]
})
export class BusinessModule {}
