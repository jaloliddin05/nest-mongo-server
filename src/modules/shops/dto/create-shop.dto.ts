import { ApiProperty } from '@nestjs/swagger';
export class CreateShopDto {

  
  @ApiProperty({
    description: `name`,
    example: "name",
  })
  name: string;
 
}
