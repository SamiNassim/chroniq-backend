import { Test, TestingModule } from '@nestjs/testing';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';

describe('StoryController', () => {
  let controller: StoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryController],
      providers: [StoryService],
    }).compile();

    controller = module.get<StoryController>(StoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
