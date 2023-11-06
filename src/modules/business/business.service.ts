import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopsService } from '../shops/shops.service';
import { Business, BusinessDocument } from './business.schema';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {

  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    private shopService: ShopsService,
    
  ) { }
  
  async create(createBusinessDto: CreateBusinessDto) {
    const createdbusiness = new this.businessModel(createBusinessDto);
    const createshop = await  this.shopService.create(createBusinessDto)
   
    createdbusiness.shops.push(createshop)
    return createdbusiness.save();
  }

  findAll() {
    return this.businessModel.find();
  }

  findOne(id: string) {
    return this.businessModel.findById(id)
  }

  findbusinessbyOwnerId(id: string) {
    return this.businessModel.findOne({owner:id})
  }

  async update(
    id: string,
    updateUserDto: any,
  ): Promise<BusinessDocument> {
    return this.businessModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.businessModel.findByIdAndDelete(id).exec();
  }
}
