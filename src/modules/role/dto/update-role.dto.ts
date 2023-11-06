import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
