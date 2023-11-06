import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PassworgDto } from './dto/password.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { InfobipService } from './send-sms/send-sms.service';
import { BusinessService } from '../business/business.service';
import { SingUpUserDto } from '../users/dto/singup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private infobipService: InfobipService,
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
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{8,16}$/;

    if (!passwordPattern.test(createUserDto.password)) {
      throw new BadRequestException('Invalid password. It should meet the criteria.');
    }

     // Hash password
    const hash = await this.hashData(createUserDto.password);

    if (!createUserDto.businessName) {
      throw new BadRequestException('business Name is required.');
    }

    const business = await this.businessService.create({name:createUserDto.businessName})

    const newUser = await this.userService.create({
      ...createUserDto,
      business:business?.id,
      password: hash,
    });
    await this.businessService.update( business.id,{owner:newUser.id})
   
    const tokens = await this.getTokens(newUser._id, newUser.phoneNumber);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.userService.findByPhoneNumber(data.phoneNumber);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcryptjs.compare(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.phoneNumber);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async getuserbynumber(phoneNumber: string) {
    const userExists = await this.userService.findByPhoneNumber(
      phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

  }

  async sendSmsNumber(sendSmsDto: SendSmsDto) {
    
    const code = await this.generateRandomCode(6)    
    
    const userExists = await this.userService.findByPhoneNumber(
      sendSmsDto.phoneNumber,
      );
      if (userExists) {
        throw new BadRequestException('User already exists');
      }
      await this.infobipService.sendSMS(sendSmsDto.phoneNumber, `Authorization code :${code}`);

    return {
      success: true,
      code:code 
    };
  }



  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async hashData(data: string) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(data, salt);
  }



  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, phoneNumber: string) {
    const [access_token, refreshToken] = await Promise.all([
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
      access_token,
      refreshToken,
    };
  }

  async getTokenById(token:string) {
    const tokens = await this.jwtService.verify(token,
      {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET')
      },);
   
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

  async ResetPassword( phoneNumber: string) {
    const userExists = await this.userService.findByPhoneNumber(phoneNumber);
    if (!userExists) {
      throw new BadRequestException('user with given phone number doesn\'t exist');
    }
    const tokens = await this.getTokens(userExists._id, userExists.phoneNumber);
    await this.updateRefreshToken(userExists._id, tokens.refreshToken);
    const link = `http://localhost:3000/password-reset?token=${tokens.access_token}`

    await this.infobipService.sendSMS(phoneNumber, `Reset password : ${link}`);
    
    return {
      success: true,
      message: 'We sended sms to your number a link to reset your password'
  }
  }


  async NewPassword( token: string,PassworgDto:PassworgDto) {
    const newToken = await this.getTokenById(token)
    if (!newToken) {
      throw new BadRequestException('Invalid link or expired');
    }
    const userId = newToken['sub'];

    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{8,16}$/;
    if (!passwordPattern.test(PassworgDto.password)) {
      throw new BadRequestException('Invalid password. It should meet the criteria.');
    }

    if (PassworgDto.password != PassworgDto.passwordConfig) {
      throw new BadRequestException('password config is incorrect');
    
    }
    const hash = await this.hashData(PassworgDto.password);
    await this.userService.update(userId, {password: hash })
  

    return {
      success: true,
      message: 'password successful changet'
    }
  }

  async createUser(createUserDto: SingUpUserDto,userId:string) {
    const userExists = await this.userService.findByPhoneNumber(
      createUserDto?.phoneNumber,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const owner = await this.userService.findById(userId) 
    const Business = await this.businessService.findbusinessbyOwnerId(userId)
    const newUser = await this.userService.create({
      ...createUserDto,
      business:Business?.id
    });
    
    Business.employees.push(newUser._id)
    Business.save()

    const tokens = await this.getTokens(newUser._id, newUser.phoneNumber);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    const link = `http://localhost:3000/password-reset?token=${tokens.access_token}`

    await this.infobipService.sendSMS(createUserDto?.phoneNumber, `
    ${owner?.firstName} invites you to join your organization and obtain access to the Loyverse back office. : ${link}
    your pincode:${createUserDto?.userQrCode}
    `);

 
    return newUser
  }
  
   async sendPinCode() {
     const code = await this.generateRandomCode(4)
     return {
       seccess: true,
       code
     }
  }
  
  async generateRandomCode(length:number) {
    const randomNumbers = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      randomNumbers.push(randomNumber);
    }
    return randomNumbers.join("");
  }

  }

