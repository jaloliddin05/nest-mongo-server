import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: `firstName`,
    example: 'Jones',
  })
  firstName: string;


  @ApiProperty({
    description: `lastName`,
    example: 'Show',
  })
  lastName: string;

  @ApiProperty({
    description: `businessName`,
    example: 'businessName',
  })
  businessName: string;

  business: string;

 
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


  shop: string;

  @ApiProperty({
    description: `email`,
    example: 'email@gmail.com',
  })
  email: string
  

  @ApiProperty({
    description: `role`,
    example: 'merchant',
  })
  role: string;
 
  refreshToken: string;


  @ApiProperty({
    description: `address`,
    example: 'Toshkent Chorsu 1 street',
  })
  address: string;


  @ApiProperty({
    description: `userQrCode`,
    example: 4444,
  })
  userQrCode: number;
}
