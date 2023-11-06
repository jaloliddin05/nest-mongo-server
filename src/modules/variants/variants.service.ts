import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant, VariantDocument } from './variant.schema';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Product, ProductDocument } from '../products/product.schema';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variant?.name) private VariantsModel: Model<VariantDocument>,
    @InjectModel(Product?.name) private ProductsModel: Model<ProductDocument>,
  ) {}

  async create(
    createVariantDto: CreateVariantDto,
  ): Promise<VariantDocument> {
    const Product = await this.ProductsModel.findById(
      createVariantDto?.productId,
    ).exec();
    if (!Product) {
      throw new BadRequestException('Product not found.');
    }
    const createdVariant = new this.VariantsModel(createVariantDto);
    Product?.variants.push(createdVariant);

    await createdVariant.save();
    await Product.save();
    return createdVariant;
  }

  async findAll(): Promise<VariantDocument[]> {
    return this.VariantsModel.find().exec();
  }

  async findById(id: string): Promise<VariantDocument> {
    return this.VariantsModel.findById(id);
  }

  async update(
    id: string,
    updateVariantDto: UpdateVariantDto,
  ): Promise<VariantDocument> {
    return this.VariantsModel.findByIdAndUpdate(id, updateVariantDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<VariantDocument> {
    return this.VariantsModel.findByIdAndDelete(id).exec();
  }
}
