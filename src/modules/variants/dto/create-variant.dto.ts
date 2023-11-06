import { ApiProperty } from '@nestjs/swagger';
export class CreateVariantDto {

  @ApiProperty({
    description: `productId`,
    example: '653a62bfa2d9c7f3e08434d7',
  })
  productId: string;

  @ApiProperty({
    description: `sku`,
    example: 'sku',
  })
  sku: string;

  @ApiProperty({
    description: `option1Value`,
    example: 'option1Value',
  })
  option1Value: string;

  @ApiProperty({
    description: `optionValue`,
    example: 'optionValue',
  })
  option2Value: string;

  @ApiProperty({
    description: `optionValue`,
    example: 'optionValue',
  })
  option3Value: string;

  @ApiProperty({
    description: `barcode`,
    example: '1219209102',
  })
  barcode: string;
}
