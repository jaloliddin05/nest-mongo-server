import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchema } from '../items/items.schema';
import { Variants, VariantsSchema } from '../variants/variants.schema';
import { ComponentsController } from './components.controller';
import { Components, ComponentsSchema } from './components.schema';
import { ComponentsService } from './components.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Components.name, schema: ComponentsSchema },
    ]),
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
    MongooseModule.forFeature([
      { name: Variants.name, schema: VariantsSchema },
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
