import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { Repository } from 'typeorm';
import { ChapterRequest } from './dto/request/create-chapter.dto';
import { Chapter } from 'src/entities/chapter.entity';
import { UpdateChapterRequest } from './dto/request/update-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
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

  async get(chapterId: string) {
    return await this.chapterRepository.findOne({
      where: { id: chapterId },
      relations: ['story.user'],
    });
  }

  async update(dto: UpdateChapterRequest, chapterId: string, userId: string) {
    const chapterToUpdate = await this.chapterRepository.findOne({
      where: { id: chapterId },
      relations: ['story.user'],
    });
    if (!chapterToUpdate) {
      throw new NotFoundException('Chapter not found!');
    }
    if (chapterToUpdate.story.user.id !== userId) {
      throw new UnauthorizedException("You can't update this chapter!");
    }

    Object.assign(chapterToUpdate, dto);

    return await this.storyRepository.save(chapterToUpdate);
  }

  async delete(chapterId: string, userId: string) {
    const selectedChapter = await this.chapterRepository.findOne({
      where: { id: chapterId },
      relations: ['story.user'],
    });
    if (!selectedChapter) {
      throw new NotFoundException('Chapter not found!');
    }
    if (selectedChapter.story.user.id !== userId) {
      throw new UnauthorizedException("You can't delete this chapter!");
    }

    return await this.chapterRepository.delete(chapterId);
  }
}
