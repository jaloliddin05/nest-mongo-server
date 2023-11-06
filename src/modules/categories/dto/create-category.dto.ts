import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({
    description: `image`,
    example: 'https://img.example.com/images',
  })
  image: string;


  @ApiProperty({
    description: `name`,
    example: 'Jones',
  })
  name: string;


  @ApiProperty({
    description: `status`,
    example: true,
  })
  status: boolean;


  @ApiProperty({
    description: `sortOrder`,
    example: 'sortOrder',
  })
  sortOrder:string;
}
