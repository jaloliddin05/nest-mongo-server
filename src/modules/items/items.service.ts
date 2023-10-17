import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Categories,
  CategoriesDocument,
} from '../categories/categories.schema';
import { Variants, VariantsDocument } from '../variants/variants.schema';
import { CreateItemsDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';
import { Items, ItemsDocument } from './items.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items?.name)
    private itemsModel: Model<ItemsDocument>,
    @InjectModel(Categories?.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  async create(createItemsDto: CreateItemsDto) {
    const category = await this.categoriesModel
      .findById(createItemsDto?.category_id)
      .exec();
    if (!category) {
      throw new BadRequestException('category not found.');
    }

    const createdItems = new this.itemsModel(createItemsDto);
    category?.products.push(createdItems);
    await category.save();
    return createdItems.save();
  }

  async findAll(): Promise<ItemsDocument[]> {
    return await this.itemsModel
      .find()
      .populate('variants')
      .populate('components');
  }

  async findById(id: string): Promise<ItemsDocument> {
    try {
      return this.itemsModel
        .findById(id)
        .populate('variants')
        .populate('components');
    } catch (error) {
      new BadRequestException('Item not found.');
    }
  }

  async findByreferenceId(id: string): Promise<ItemsDocument> {
    return this.itemsModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateItemsDto: UpdateItemsDto,
  ): Promise<ItemsDocument> {
    return this.itemsModel
      .findByIdAndUpdate(id, updateItemsDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ItemsDocument> {
    return this.itemsModel.findByIdAndDelete(id).exec();
  }
}
