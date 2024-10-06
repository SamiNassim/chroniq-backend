import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { Chapter } from 'src/entities/chapter.entity';
import { Story } from 'src/entities/story.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
      imports: [TypeOrmModule.forFeature([Story, Chapter])],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
