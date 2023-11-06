import { ApiProperty } from '@nestjs/swagger';
export class CreateComponentDto {
  @ApiProperty({
    description: `quantity`,
    example: 4,
  })
  quantity: number;

  @ApiProperty({
    description: `variantId`,
    example: '652e55f205aaf5a5bd028999',
  })
  variantId: string;
}
