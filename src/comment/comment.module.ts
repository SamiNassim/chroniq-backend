import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { Chapter } from 'src/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Chapter])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
