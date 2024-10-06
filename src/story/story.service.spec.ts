import { Test, TestingModule } from '@nestjs/testing';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';

describe('StoryService', () => {
  let service: StoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryService],
      imports: [TypeOrmModule.forFeature([Story, User])],
    }).compile();

    service = module.get<StoryService>(StoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
