import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/product.schema';
import { Variant, VariantDocument } from '../variants/variant.schema';
import { Component, ComponentDocument } from './component.schema';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel(Component?.name)
    private ComponentsModel: Model<ComponentDocument>,
    @InjectModel(Product?.name) private ProductsModel: Model<ProductDocument>,
    @InjectModel(Variant?.name) private VariantsModel: Model<VariantDocument>,
  ) {}

  async create(createComponentDto: CreateComponentDto) {
    const Variant = await this.VariantsModel.findById(
      createComponentDto?.variantId,
    ).exec();
    if (!Variant) {
      throw new BadRequestException('Variant not found.');
    }
    const Products = await this.ProductsModel.findById(Variant?.productId).exec();
    if (!Products) {
      throw new BadRequestException('Products not found.');
    }
    console.log(Products?.components);

    const createdComponents = new this.ComponentsModel(createComponentDto);

    Products?.components.push(createdComponents);
    createdComponents.save();
    Products.save();

    return createdComponents;
  }

  async findAll(): Promise<ComponentDocument[]> {
    return this.ComponentsModel.find().exec();
  }

  async findById(id: string): Promise<ComponentDocument> {
    return this.ComponentsModel.findById(id);
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
  ): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndUpdate(id, updateComponentDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ComponentDocument> {
    return this.ComponentsModel.findByIdAndDelete(id).exec();
  }
}
