import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/guards/acessToken.guard';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}

  @ApiOperation({ summary: 'Method: Create New Shop' })
  @ApiOkResponse({
    description: 'The Shop was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createShopDto: CreateShopDto,@Req() req: Request) {
    return await this.ShopsService.createByBussines(createShopDto,req['user']['sub']);
  }

  @ApiOperation({ summary: 'Method: Get All  Shops' })
  @ApiOkResponse({
    description: 'The Shops was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.ShopsService.findAll();
  }

  @ApiOperation({ summary: 'Method: Get  Shop by Id' })
  @ApiOkResponse({
    description: 'The Shop was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ShopsService.findById(id);
  }

  @ApiOperation({ summary: 'Method: Update  Shop' })
  @ApiOkResponse({
    description: 'The Shop was updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.ShopsService.update(id, updateShopDto);
  }

  @ApiOperation({ summary: 'Method: Delete  Shop' })
  @ApiOkResponse({
    description: 'The Shop was deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ShopsService.remove(id);
  }
}
