import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { InfobipService } from './send-sms/send-sms.service';
import { BusinessModule } from '../business/business.module';
import { PhoneValidationService } from './phone-validation/phone-validation';
import { EmailValidationService } from './email-validation/email-validation.service';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    BusinessModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    InfobipService,
    PhoneValidationService,
    EmailValidationService
  ],
})
export class AuthModule {}
