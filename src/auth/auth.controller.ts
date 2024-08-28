import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { RefreshTokenDto } from 'src/user/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() createUserDto: RegisterUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.token);
  }
}
