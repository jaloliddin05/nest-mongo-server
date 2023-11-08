import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business,BusinessDocument } from '../business/business.schema';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './role.schema';


@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role?.name) private RolesModel: Model<RoleDocument>,
    @InjectModel(Business?.name) private BusinessModel: Model<BusinessDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {

    const createdRole = new this.RolesModel(createRoleDto);
    
    const business = await this.BusinessModel.findById(createRoleDto.businessId)
    business.role.push(createdRole)

    business.save()
    return createdRole.save();
  }

  async findAll(): Promise<RoleDocument[]> {
    return await this.RolesModel.find()
  }

  async findById(id: string): Promise<RoleDocument> {
    try {
      return this.RolesModel
        .findById(id)
        
    } catch (error) {
      new BadRequestException('Role not found.');
    }
  }
 
  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDocument> {
    return this.RolesModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<RoleDocument> {
    return this.RolesModel.findByIdAndDelete(id).exec();
  }
}
