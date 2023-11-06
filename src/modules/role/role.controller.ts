import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard } from 'src/guards/acessToken.guard';

import {

  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { RolesService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';


@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RolesService) {}

  @ApiOperation({ summary: 'Method: Create New Role' })
  @ApiOkResponse({
    description: 'The Role was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.RoleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Method: Get All  Roles' })
  @ApiOkResponse({
    description: 'The Roles was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.RoleService.findAll();
  }

  @ApiOperation({ summary: 'Method: Get  Role by Id' })
  @ApiOkResponse({
    description: 'The Role was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.RoleService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update  Role' })
  @ApiOkResponse({
    description: 'The Role was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.RoleService.update(id, updateRoleDto);
  }
  
  @ApiOperation({ summary: 'Method: Delete  Role' })
  @ApiOkResponse({
    description: 'The Role was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(id);
  }
}
