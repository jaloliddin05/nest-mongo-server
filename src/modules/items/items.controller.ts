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

import { AccessTokenGuard } from 'src/common/guards/acessToken.guard';
import { ItemsService } from './items.service';
import { CreateItemsDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemsDto: CreateItemsDto) {
    return this.itemsService.create(createItemsDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemsDto: UpdateItemsDto) {
    return this.itemsService.update(id, updateItemsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
