import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  import * as bcryptjs from 'bcryptjs';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { hashData } from 'src/infra/heleprs';
  
  @Injectable()
  export class JwtTokenService {
    constructor(
      private userService: UsersService,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
  
    async updateRefreshToken(userId: string, refreshToken: string) {
      const hashedRefreshToken = await hashData(refreshToken);
      await this.userService.update(userId, {
        refreshToken: hashedRefreshToken,
      });
    }
  
    async getTokens(userId: string, phoneNumber: string) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: userId,
            phoneNumber,
          },
          {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            phoneNumber,
          },
          {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
          },
        ),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }
  
    async getTokenById(token: string) {
      const tokens = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
  
      return tokens;
    }
  
    async refreshTokens(userId: string, refreshToken: string) {
      const user = await this.userService.findById(userId);
      if (!user || !user.refreshToken)
        throw new ForbiddenException('Access Denied');
      const refreshTokenMatches = await bcryptjs.compare(
        user.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user.id, user.phoneNumber);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }

  }
  