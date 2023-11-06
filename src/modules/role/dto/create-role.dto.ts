import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {

  @ApiProperty({
    description: `name`,
    example: "name",
  })
  name: string;
 
}
