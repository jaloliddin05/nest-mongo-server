import { ApiProperty } from '@nestjs/swagger';
export class CreateBusinessDto {

  
  @ApiProperty({
    description: `name`,
    example: "name",
  })
  name: string;
 
}
