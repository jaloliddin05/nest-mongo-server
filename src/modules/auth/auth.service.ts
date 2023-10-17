import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findByPhoneNumber(
      createUserDto.phone_number,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.phone_number);
    await this.updateRefreshToken(newUser._id, tokens.refresh_token);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.userService.findByPhoneNumber(data.phone_number);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcryptjs.compare(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.phone_number);
    await this.updateRefreshToken(user._id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refresh_token: null });
  }

  async hashData(data: string) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(data, salt);
  }

  async updateRefreshToken(userId: string, refresh_token: string) {
    const hashedRefreshToken = await this.hashData(refresh_token);
    await this.userService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async getTokens(user_id: string, phone_number: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user_id,
          phone_number,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user_id,
          phone_number,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshTokens(user_id: string, refresh_token: string) {
    const user = await this.userService.findById(user_id);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcryptjs.compare(
      user.refresh_token,
      refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.phone_number);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
