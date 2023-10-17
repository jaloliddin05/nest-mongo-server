import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from './categories.schema';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories?.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  async create(
    createUserDto: CreateCategoriesDto,
  ): Promise<CategoriesDocument> {
    const createdUser = new this.categoriesModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<CategoriesDocument[]> {
    return this.categoriesModel.find().exec();
  }

  async findById(id: string): Promise<CategoriesDocument> {
    return this.categoriesModel.findById(id).populate('products');
  }

  async update(
    id: string,
    updateUserDto: UpdateCategoriesDto,
  ): Promise<CategoriesDocument> {
    return this.categoriesModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CategoriesDocument> {
    return this.categoriesModel.findByIdAndDelete(id).exec();
  }
}
