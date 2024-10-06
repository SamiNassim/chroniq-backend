import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
      imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        JwtModule.register({
          global: true,
        }),
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
