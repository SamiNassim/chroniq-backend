import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { User } from './entities/user.entity';
import { Story } from './entities/story.entity';
import { Chapter } from './entities/chapter.entity';
import { StoryController } from './story/story.controller';
import { StoryService } from './story/story.service';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'postgres',
      entities: [User, Story, Chapter],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    StoryModule,
  ],
  controllers: [AppController, StoryController],
  providers: [AppService, StoryService],
})
export class AppModule {}
