import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items, ItemsDocument } from '../items/items.schema';
import { Variants, VariantsDocument } from '../variants/variants.schema';
import { Components, ComponentsDocument } from './components.schema';
import { CreateComponentsDto } from './dto/create-components.dto';
import { UpdateComponentsDto } from './dto/update-components.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel(Components?.name)
    private ComponentsModel: Model<ComponentsDocument>,
    @InjectModel(Items?.name) private ItemsModel: Model<ItemsDocument>,
    @InjectModel(Variants?.name) private VariantsModel: Model<VariantsDocument>,
  ) {}

  async create(createComponentsDto: CreateComponentsDto) {
    const Variant = await this.VariantsModel.findById(
      createComponentsDto?.variants_id,
    ).exec();
    if (!Variant) {
      throw new BadRequestException('Variant not found.');
    }
    const Items = await this.ItemsModel.findById(Variant?.item_id).exec();
    if (!Items) {
      throw new BadRequestException('Items not found.');
    }
    console.log(Items?.components);

    const createdComponents = new this.ComponentsModel(createComponentsDto);

    Items?.components.push(createdComponents);
    createdComponents.save();
    Items.save();

    return createdComponents;
  }

  async findAll(): Promise<ComponentsDocument[]> {
    return this.ComponentsModel.find().exec();
  }

  async findById(id: string): Promise<ComponentsDocument> {
    return this.ComponentsModel.findById(id);
  }

  async update(
    id: string,
    updateComponentsDto: UpdateComponentsDto,
  ): Promise<ComponentsDocument> {
    return this.ComponentsModel.findByIdAndUpdate(id, updateComponentsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ComponentsDocument> {
    return this.ComponentsModel.findByIdAndDelete(id).exec();
  }
}
