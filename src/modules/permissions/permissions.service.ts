import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../roles/role.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import { Permission, PermissionDocument } from './permission.schema';



@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission?.name)
    private PermissionModel: Model<PermissionDocument>,
    @InjectModel(Role?.name)
    private RoleModel: Model<RoleDocument>
  ) {}

    async create(createPermissionDto: CreatePermissionDto) {
 
    const createdPermission = new this.PermissionModel(createPermissionDto);
    const role = await this.RoleModel.findById(createPermissionDto.roleId)
    role.permission.push(createdPermission)

    role.save()
    return createdPermission.save();
  }

  async findAll(): Promise<PermissionDocument[]> {
    return await this.PermissionModel.find()
  }

  async findById(id: string): Promise<PermissionDocument> {
    try {
      return this.PermissionModel
        .findById(id)
        
    } catch (error) {
      new BadRequestException('Permission not found.');
    }
  }

 
  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDocument> {
    return this.PermissionModel
      .findByIdAndUpdate(id, updatePermissionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PermissionDocument> {
    return this.PermissionModel.findByIdAndDelete(id).exec();
  }
}
