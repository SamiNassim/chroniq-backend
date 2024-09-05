import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ChapterRequest } from './dto/request/create-chapter.dto';
import { Chapter } from 'src/entities/chapter.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {}

  async create(dto: ChapterRequest, storyId: string, userId: string) {
    const selectedStory = await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['user', 'chapters'],
    });
    if (!selectedStory) {
      throw new NotFoundException('Story not found!');
    }
    if (selectedStory.user.id !== userId) {
      throw new UnauthorizedException("You can't update this story!");
    }
    const newChapter = await this.chapterRepository.create({
      ...dto,
      story: selectedStory,
    });

    selectedStory.chapters.push(newChapter);
    await this.storyRepository.save(selectedStory);

    return await this.chapterRepository.save(newChapter);
  }
}
