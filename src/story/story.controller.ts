import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryRequest } from './dto/request/create-story.dto';
import { StoryResponse } from './dto/response/story.dto';
import { Response } from 'express';

@Controller('story')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @Post('/create')
  async create(
    @Body() dto: StoryRequest,
    @Request() req,
  ): Promise<StoryResponse> {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    const userId = req.user.sub;

    const newStory = await this.storyService.create(dto, userId);
    const { user, ...newStoryResponse } = newStory;

    return { ...newStoryResponse, userId: user.id };
  }

  @Get(':id')
  async get(@Param('id') storyId): Promise<StoryResponse> {
    const story = await this.storyService.get(storyId);
    if (!story) {
      throw new NotFoundException('Story not found!');
    }

    const { user, ...storyResponse } = story;

    return { ...storyResponse, userId: story.user.id };
  }

  @Put('/update/:id')
  async update(
    @Body() dto: StoryRequest,
    @Request() req,
    @Param('id') storyId: string,
  ): Promise<StoryResponse> {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    const userId = req.user.sub;

    const updateStory = await this.storyService.update(dto, storyId, userId);
    const { user, ...updatedStory } = updateStory;

    return { ...updatedStory, userId: user.id };
  }

  @Put('/delete/:id') // HTTP Method is PUT because in this case it's a "soft delete" (move to bin)
  async delete(@Req() req, @Res() res: Response, @Param('id') storyId: string) {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    if (!req.params) {
      throw new NotFoundException('Story ID missing!');
    }
    const userId = req.user.sub;

    await this.storyService.deleteToBin(storyId, userId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Story deleted',
    });
  }
}
