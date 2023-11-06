import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category?.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async create(
    createUserDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const createdUser = new this.categoriesModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoriesModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'productsArr',
        },
      },
    ]);
  }

  async findById(id: string): Promise<CategoryDocument> {
    return this.categoriesModel.findById(id).populate('products');
  }

  async update(
    id: string,
    updateUserDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoriesModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CategoryDocument> {
    return this.categoriesModel.findByIdAndDelete(id).exec();
  }
}
