import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantsDto } from './create-variants.dto';

export class UpdateVariantsDto extends PartialType(CreateVariantsDto) {}
