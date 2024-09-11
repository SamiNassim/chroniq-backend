import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { Repository } from 'typeorm';
import { StoryRequest } from './dto/request/create-story.dto';
import { User } from 'src/entities/user.entity';
import { UpdateStoryRequest } from './dto/request/update-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(dto: StoryRequest, userId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const newStory = this.storyRepository.create({
      ...dto,
      user: currentUser,
    });

    return await this.storyRepository.save(newStory);
  }

  async get(storyId: string) {
    return await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['user'],
    });
  }

  async update(dto: UpdateStoryRequest, storyId: string, userId: string) {
    const storyToUpdate = await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['user'],
    });
    if (!storyToUpdate) {
      throw new NotFoundException('Story not found!');
    }
    if (storyToUpdate.user.id !== userId) {
      throw new UnauthorizedException("You can't update this story!");
    }

    Object.assign(storyToUpdate, dto);

    return await this.storyRepository.save(storyToUpdate);
  }

  async deleteToBin(storyId: string, userId: string) {
    const selectedStory = await this.storyRepository.findOne({
      where: { id: storyId },
    });
    if (!selectedStory) {
      throw new NotFoundException('Story not found!');
    }
    if (selectedStory.user.id !== userId) {
      throw new UnauthorizedException("You can't delete this story!");
    }

    return await this.storyRepository.update(
      { id: storyId },
      { isDeleted: true },
    );
  }
}
