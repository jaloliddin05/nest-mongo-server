import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsDto } from './create-items.dto';

export class UpdateItemsDto extends PartialType(CreateItemsDto) {}
