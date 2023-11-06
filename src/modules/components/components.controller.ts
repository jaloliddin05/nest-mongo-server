import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly ComponentsService: ComponentsService) {}

  @ApiOperation({ summary: 'Method: Create New component' })
  @ApiOkResponse({
    description: 'The component was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  async create(@Body() createComponentsDto: CreateComponentDto) {
    return await this.ComponentsService.create(createComponentsDto);
  }

  
  @ApiOperation({ summary: 'Method: Get All  components' })
  @ApiOkResponse({
    description: 'The components was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.ComponentsService.findAll();
  }

  
  @ApiOperation({ summary: 'Method: Get  component by Id' })
  @ApiOkResponse({
    description: 'The component was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ComponentsService.findById(id);
  }


  @ApiOperation({ summary: 'Method: Update  component' })
  @ApiOkResponse({
    description: 'The component was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentsDto: UpdateComponentDto,
  ) {
    return this.ComponentsService.update(id, updateComponentsDto);
  }

  
  @ApiOperation({ summary: 'Method: Delete  component' })
  @ApiOkResponse({
    description: 'The component was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ComponentsService.remove(id);
  }
}
