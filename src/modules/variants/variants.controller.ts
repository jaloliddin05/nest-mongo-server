import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Variants')
@Controller('variants')
export class VariantsController {
  constructor(private readonly VariantsService: VariantsService) {}

  @ApiOperation({ summary: 'Method: Create New variant' })
  @ApiOkResponse({
    description: 'The variant was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.VariantsService.create(createVariantDto);
  }

  @ApiOperation({ summary: 'Method: returns current variant' })
  @ApiOkResponse({
    description: 'The variant was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.VariantsService.findAll();
  }

  @ApiOperation({ summary: 'Method: returns one variant' })
  @ApiOkResponse({
    description: 'The variant was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.VariantsService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update current variant' })
  @ApiOkResponse({
    description: 'The variant was Uodated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.VariantsService.update(id, updateVariantDto);
  }

  @ApiOperation({ summary: 'Method: Delete current variant' })
  @ApiOkResponse({
    description: 'The variant was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.VariantsService.remove(id);
  }
}
