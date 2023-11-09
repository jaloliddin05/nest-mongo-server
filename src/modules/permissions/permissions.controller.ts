import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { PermissionService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly PermissionService: PermissionService) {}

  @ApiOperation({ summary: 'Method: Create New Permission' })
  @ApiOkResponse({
    description: 'The Permission was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.PermissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Method: Get All  Permissions' })
  @ApiOkResponse({
    description: 'The Permissions was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.PermissionService.findAll();
  }

  @ApiOperation({ summary: 'Method: Get  Permission by Id' })
  @ApiOkResponse({
    description: 'The Permission was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.PermissionService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update  Permission' })
  @ApiOkResponse({
    description: 'The Permission was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.PermissionService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Method: Delete  Permission' })
  @ApiOkResponse({
    description: 'The Permission was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PermissionService.remove(id);
  }
}
