import { ApiProperty } from '@nestjs/swagger';
export class SendSmsDto {
  @ApiProperty({
    description: `phoneNumber`,
    example: '+998997811356',
  })
  phoneNumber: string;


}
