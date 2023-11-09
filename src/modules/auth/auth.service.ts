import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { PassworgDto } from './dto/password.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { BusinessService } from '../business/business.service';
import { SingUpUserDto } from '../users/dto/singup-user.dto';
import { validatePhoneNumber, validateEmail } from '../../infra/validators';
import { SmsService } from '../sms/sms.service';
import { generateRandomCode, hashData } from 'src/infra/heleprs';
import { JwtTokenService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtTokenService,
    private infobipService: SmsService,
    private businessService: BusinessService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    // Password Validation
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{8,16}$/;

    if (!passwordPattern.test(createUserDto.password)) {
      throw new BadRequestException(
        'Invalid password. It should meet the criteria.',
      );
    }

    // phoneNumber Validation
    const isValid = validatePhoneNumber(createUserDto.phoneNumber);

    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }
    // email Validation
    if (createUserDto.email) {
      const userExists = await this.userService.findByEmail(
        createUserDto.email,
      );

      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      if (!validateEmail(createUserDto.email.toString())) {
        throw new BadRequestException('Invalid email');
      }
    }

    // Hash password
    const hash = await hashData(createUserDto.password);

    if (!createUserDto.businessName) {
      throw new BadRequestException('Business name is required.');
    }

    const business = await this.businessService.create({
      name: createUserDto.businessName,
    });

    const newUser = await this.userService.create({
      ...createUserDto,
      business: business?.id,
      password: hash,
    });
    await this.businessService.update(business.id, { owner: newUser.id });

    const tokens = await this.jwtTokenService.getTokens(newUser._id, newUser.phoneNumber);
    await this.jwtTokenService.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.userService.findByPhoneNumber(data.phoneNumber);
    if (!user) throw new BadRequestException('User does not exist');

    // phoneNumber Validation
    const isValid = validatePhoneNumber(data.phoneNumber);

    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }

    const passwordMatches = await bcryptjs.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.jwtTokenService.getTokens(user._id, user.phoneNumber);
    await this.jwtTokenService.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  // async getuserbynumber(phoneNumber: string) {
  //   // phoneNumber Validation
  //   const isValid = validatePhoneNumber(phoneNumber);

  //   if (!isValid) {
  //     throw new BadRequestException('Invalid phone number');
  //   }

  //   const userExists = await this.userService.findByPhoneNumber(phoneNumber);
  //   if (userExists) {
  //     throw new BadRequestException('User already exists');
  //   }
  // }

  async sendSmsNumber(sendSmsDto: SendSmsDto) {
    const code = generateRandomCode(6);

    const userExists = await this.userService.findByPhoneNumber(
      sendSmsDto.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    await this.infobipService.sendSMS(
      sendSmsDto.phoneNumber,
      `Authorization code :${code}`,
    );

    return {
      success: true,
      code: code,
    };
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async ResetPassword(phoneNumber: string) {
    const userExists = await this.userService.findByPhoneNumber(phoneNumber);
    if (!userExists) {
      throw new BadRequestException(
        "user with given phone number doesn't exist",
      );
    }

    const tokens = await this.jwtTokenService.getTokens(userExists._id, userExists.phoneNumber);

    const link = `http://localhost:3000/password-reset?token=${tokens.accessToken}`;

    await this.infobipService.sendSMS(phoneNumber, `Reset password : ${link}`);

    await this.jwtTokenService.updateRefreshToken(userExists._id, tokens.refreshToken);

    return {
      success: true,
      message: 'We sended sms to your number a link to reset your password',
    };
  }

  async NewPassword(token: string, PassworgDto: PassworgDto) {
    const newToken = await this.jwtTokenService.getTokenById(token);
    if (!newToken) {
      throw new BadRequestException('Invalid link or expired');
    }
    const userId = newToken['sub'];

    const passwordPattern =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{8,16}$/;
    if (!passwordPattern.test(PassworgDto.password)) {
      throw new BadRequestException(
        'Invalid password. It should meet the criteria.',
      );
    }

    if (PassworgDto.password != PassworgDto.passwordConfig) {
      throw new BadRequestException('password config is incorrect');
    }
    const hash = await hashData(PassworgDto.password);
    await this.userService.update(userId, { password: hash });

    return {
      success: true,
      message: 'password successful changet',
    };
  }

  async createUser(createUserDto: SingUpUserDto, userId: string) {
    // phoneNumber Validation
    const isValid = validatePhoneNumber(createUserDto.phoneNumber);
    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }

    const userExists = await this.userService.findByPhoneNumber(
      createUserDto?.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const owner = await this.userService.findById(userId);
    const Business = await this.businessService.findbusinessbyOwnerId(userId);
    const newUser = await this.userService.create({
      ...createUserDto,
      business: Business?.id,
    });

    Business.employees.push(newUser._id);
    Business.save();

    const tokens = await this.jwtTokenService.getTokens(newUser._id, newUser.phoneNumber);
    await this.jwtTokenService.updateRefreshToken(newUser._id, tokens.refreshToken);
    const link = `http://localhost:3000/password-reset?token=${tokens.accessToken}`;

    await this.infobipService.sendSMS(
      createUserDto?.phoneNumber,
      `
    ${owner?.firstName} invites you to join your organization and obtain access to the Loyverse back office. : ${link}
    your pincode:${createUserDto?.userQrCode}
    `,
    );

    return newUser;
  }

  async sendPinCode() {
    const code = generateRandomCode(4);
    return {
      seccess: true,
      code,
    };
  }
}
