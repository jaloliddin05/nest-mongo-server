import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../categories/category.schema';
import { Variant, VariantDocument } from '../variants/variant.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product?.name)
    private productsModel: Model<ProductDocument>,
    @InjectModel(Category?.name)
      
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesModel
      .findById(createProductDto?.categoryId)
      .exec();
    if (!category) {
      throw new BadRequestException('category not found.');
    }

    const createdProduct = new this.productsModel(createProductDto);
    category?.products.push(createdProduct);
    await category.save();
    return createdProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productsModel.aggregate([
      {
        $lookup: {
          from: 'variants',
          localField: 'variants',
          foreignField: '_id',
          as: 'variantsArr',
        },
      },
      {
        $lookup: {
          from: 'components',
          localField: 'components',
          foreignField: '_id',
          as: 'componentsArr',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: 'categoryId',
          as: 'category',
        },
      },
    ]);
  }

  async findById(id: string): Promise<ProductDocument> {
    try {
      return this.productsModel
        .findById(id)
        .populate('variants')
        .populate('components');
    } catch (error) {
      new BadRequestException('Product not found.');
    }
  }

  async findByreferenceId(id: string): Promise<ProductDocument> {
    return this.productsModel.findOne({ reference_id: id });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return this.productsModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ProductDocument> {
    return this.productsModel.findByIdAndDelete(id).exec();
  }
}
