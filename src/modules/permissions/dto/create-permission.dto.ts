import { ApiProperty } from '@nestjs/swagger';
export class CreatePermissionDto {

    @ApiProperty({
        description: `name`,
        example: "name",
    })
    name: string;
  
    @ApiProperty({
        description: `roleId`,
        example: "Id",
    })
    roleId: string;
    
    @ApiProperty({
        description: `PermissiocatgoryId`,
        example: "Id",
    })
    PermissiocatgoryId: string;
}
