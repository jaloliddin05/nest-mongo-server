import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token/refresh-token.strategy';
import { UsersModule } from '../users/users.module';
import { BusinessModule } from '../business/business.module';
import { SmsModule } from '../sms/sms.module';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    BusinessModule,
    PassportModule,
    SmsModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtTokenService
  ],
})
export class AuthModule {}
