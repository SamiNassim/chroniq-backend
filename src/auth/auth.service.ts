import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: RegisterUserDto) {
    const existingUserByEmail = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists!');
    }
    const existingUserByUsername = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (existingUserByUsername) {
      throw new ConflictException('User with this name already exists!');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const { access_token, refresh_token } = await this.generateTokens(user.id);

    const hashedRefreshToken = await argon2.hash(refresh_token);

    await this.userService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    return { access_token, refresh_token };
  }

  async generateTokens(userId: string) {
    const user = await this.userService.findById(userId);
    const payload = { sub: userId, username: user.username };
    const jwtAccessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtAccessSecret,
        expiresIn: jwtConstants.ACCESS_TOKEN_EXPIRESIN,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtRefreshSecret,
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRESIN,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshTokens(refreshToken: string) {
    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    let payload;
    try {
      payload = await this.jwtService.verify(refreshToken, {
        secret: jwtRefreshSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token!');
    }
    const user = await this.userService.findById(payload.sub);
    const isRefreshTokenMatch = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!user || !isRefreshTokenMatch) {
      throw new UnauthorizedException('Invalid refresh token!');
    }

    const { access_token, refresh_token } = await this.generateTokens(
      payload.sub,
    );
    const hashedRefreshToken = await argon2.hash(refresh_token);
    await this.userService.updateHashedRefreshToken(
      payload.sub,
      hashedRefreshToken,
    );
    return {
      access_token,
      refresh_token,
    };
  }
}
