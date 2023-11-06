import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty({
    description: `phoneNumber`,
    example: '+998997811356',
  })
  phoneNumber: string;


  @ApiProperty({
    description: `Password`,
    example: 'dsk_45lldD&',
  })
  password: string;
}
