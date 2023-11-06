import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../categories/category.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './role.schema';


@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role?.name)
    private RolesModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
 
    const createdRole = new this.RolesModel(createRoleDto);

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
