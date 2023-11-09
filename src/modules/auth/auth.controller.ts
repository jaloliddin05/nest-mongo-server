import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './strategies/access-token/acess-token.guard';
import { RefreshTokenGuard } from './strategies/refresh-token/refresh-token.guard';
import { SendSmsDto } from './dto/send-sms.dto';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PassworgDto } from './dto/password.dto';
import { SingUpUserDto } from '../users/dto/singup-user.dto';
import { JwtTokenService } from './jwt.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtTokenService:JwtTokenService
  ) { }

  @ApiOperation({ summary: 'Method: Signup' })
  @ApiOkResponse({
    description: 'The user was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Method: signin' })
  @ApiOkResponse({
    description: 'New access, refresh tokens have been saved.',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }


  @ApiOperation({ summary: 'Method: create new user' })
  @ApiOkResponse({
    description: 'for merchant  createing new  employee',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('user')
  newUser(@Body() createUserDto: SingUpUserDto,@Req() req: Request) {
    return this.authService.createUser(createUserDto,req.user['sub']);
  }

  @ApiOperation({ summary: 'Method: Checking user phone number' })
  @ApiOkResponse({
    description: 'When user will write a phone number this method will send sms to his phone to verify',
  })
  @ApiForbiddenResponse({ description: 'Number not found' })
  @Post('send-sms')
  async sendSMS(@Body() sendSmsDto: SendSmsDto) {
    return await this.authService.sendSmsNumber(sendSmsDto)
  }


  @ApiOperation({ summary: 'Method: reset password' })
  @ApiOkResponse({
    description: 'This method will send sms link to set new password',
  })
  @ApiForbiddenResponse({ description: 'not found' })
  @Post('pwdforgot')
  async resetPassword(@Body() sendSmsDto: SendSmsDto) {
    return this.authService.ResetPassword(sendSmsDto.phoneNumber);
  }

  
  @ApiOperation({ summary: 'Method:new password' })
  @ApiOkResponse({
    description: 'This method will send sms link to set new password',
  })
  @ApiForbiddenResponse({ description: 'not found' })
  @Post('pwdreset')
  async newPassword(@Body() passwordDot: PassworgDto, @Query('token') token: string) {
    
    return  await this.authService.NewPassword(token,passwordDot)
  }

  @ApiOperation({ summary: 'Method: logout' })
  @ApiOkResponse({
    description: 'The user was logged out successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.jwtTokenService.refreshTokens(userId, refreshToken);
  }

  @ApiOperation({ summary: 'Method:Geterate PinCode' })
  @ApiOkResponse({
    description: 'This method will return a pin code for the user',
  })
  @ApiForbiddenResponse({ description: 'not found' })
  @Get('pincode')
  async newPinCode() {
    return await this.authService.sendPinCode()
  }
}
