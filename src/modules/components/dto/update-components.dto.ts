import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentsDto } from './create-components.dto';

export class UpdateComponentsDto extends PartialType(CreateComponentsDto) {}
