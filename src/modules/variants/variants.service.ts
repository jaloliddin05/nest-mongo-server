import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variants, VariantsDocument } from './variants.schema';
import { CreateVariantsDto } from './dto/create-variants.dto';
import { UpdateVariantsDto } from './dto/update-variants.dto';
import { Items, ItemsDocument } from '../items/items.schema';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variants?.name) private VariantsModel: Model<VariantsDocument>,
    @InjectModel(Items?.name) private ItemsModel: Model<ItemsDocument>,
  ) {}

  async create(
    createVariantsDto: CreateVariantsDto,
  ): Promise<VariantsDocument> {
    const Items = await this.ItemsModel.findById(
      createVariantsDto?.item_id,
    ).exec();
    if (!Items) {
      throw new BadRequestException('Items not found.');
    }
    const createdVariants = new this.VariantsModel(createVariantsDto);
    Items?.variants.push(createdVariants);

    await createdVariants.save();
    await Items.save();
    return createdVariants;
  }

  async findAll(): Promise<VariantsDocument[]> {
    return this.VariantsModel.find().exec();
  }

  async findById(id: string): Promise<VariantsDocument> {
    return this.VariantsModel.findById(id);
  }

  async update(
    id: string,
    updateVariantsDto: UpdateVariantsDto,
  ): Promise<VariantsDocument> {
    return this.VariantsModel.findByIdAndUpdate(id, updateVariantsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<VariantsDocument> {
    return this.VariantsModel.findByIdAndDelete(id).exec();
  }
}
