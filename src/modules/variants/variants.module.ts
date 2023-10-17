import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items/items.module';
import { Items, ItemsSchema } from '../items/items.schema';
import { VariantsController } from './variants.controller';
import { Variants, VariantsSchema } from './variants.schema';
import { VariantsService } from './variants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variants.name, schema: VariantsSchema },
    ]),
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
