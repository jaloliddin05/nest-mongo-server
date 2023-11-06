import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  
  @ApiProperty({
    description: `productName`,
    example: 'Book',
  })
  productName: string;
  
  @ApiProperty({
    description: `description`,
    example: 'description about product',
  })
  description: string;
  
  @ApiProperty({
    description: `categoryId`,
    example: '652e53dc816d176acdad441f',
  })
  categoryId: string;

  
  @ApiProperty({
    description: `form`,
    example: 'form',
  })
  form: string;
  
  @ApiProperty({
    description: `color`,
    example: 'blue',
  })
  color: string;
  
  @ApiProperty({
    description: `option1Name`,
    example: 'option1Name',
  })
  option1Name: string;
  
  @ApiProperty({
    description: `option2Name`,
    example: 'option2Name',
  })
  option2Name: string;
  
  @ApiProperty({
    description: `option3Name`,
    example: 'option3Name',
  })
  option3Name: string;
}
