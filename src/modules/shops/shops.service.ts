import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './shop.schema';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop?.name)
    private ShopsModel: Model<ShopDocument>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const createdShops = new this.ShopsModel(createShopDto);
    return createdShops.save();
  }

  async findAll(): Promise<ShopDocument[]> {
    return this.ShopsModel.find().exec();
  }

  async findById(id: string): Promise<ShopDocument> {
    return this.ShopsModel.findById(id);
  }

  async update(
    id: string,
    updateShopDto: UpdateShopDto,
  ): Promise<ShopDocument> {
    return this.ShopsModel.findByIdAndUpdate(id, updateShopDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<ShopDocument> {
    return this.ShopsModel.findByIdAndDelete(id).exec();
  }
}
