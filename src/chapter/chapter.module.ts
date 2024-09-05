import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';
import { Chapter } from 'src/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, User, Chapter])],
  providers: [ChapterService],
  controllers: [ChapterController],
})
export class ChapterModule {}
