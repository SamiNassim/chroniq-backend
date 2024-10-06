import { Test, TestingModule } from '@nestjs/testing';
import { ChapterService } from './chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';
import { Chapter } from 'src/entities/chapter.entity';

describe('ChapterService', () => {
  let service: ChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapterService],
      imports: [TypeOrmModule.forFeature([Story, User, Chapter])],
    }).compile();

    service = module.get<ChapterService>(ChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
