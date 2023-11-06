import { ApiProperty } from '@nestjs/swagger';
export class PassworgDto {

  @ApiProperty({
    description: `Password`,
    example: 'dsk_45lldD&',
  })
    password: string;
    
    @ApiProperty({
        description: `passwordConfig`,
        example: 'dsk_45lldD',
      })
      passwordConfig: string;
}
