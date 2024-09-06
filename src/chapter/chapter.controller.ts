import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterRequest } from './dto/request/create-chapter.dto';
import { ChapterResponse } from './dto/response/chapter.dto';

@Controller('chapter')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Post('/create/:id')
  async create(
    @Body() dto: ChapterRequest,
    @Request() req,
    @Response() res,
    @Param('id') storyId,
  ) {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    const userId = req.user.sub;

    await this.chapterService.create(dto, storyId, userId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.CREATED,
      message: 'Chapter created.',
    });
  }

  @Get(':id')
  async get(@Param('id') chapterId): Promise<ChapterResponse> {
    const chapter = await this.chapterService.get(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found!');
    }

    const { story, ...chapterResponse } = chapter;

    return { ...chapterResponse, userId: story.user.id };
  }

  @Put('/update/:id')
  async update(
    @Body() dto: ChapterRequest,
    @Request() req,
    @Param('id') chapterId: string,
  ): Promise<ChapterResponse> {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    const userId = req.user.sub;

    const updateChapter = await this.chapterService.update(
      dto,
      chapterId,
      userId,
    );
    const { user, ...updatedChapter } = updateChapter;

    return { ...updatedChapter, userId: user.id };
  }

  @Delete('/delete/:id')
  async delete(
    @Request() req,
    @Response() res,
    @Param('id') chapterId: string,
  ) {
    if (!req.user) {
      throw new UnauthorizedException('You must be authenticated!');
    }
    const userId = req.user.sub;
    await this.chapterService.delete(chapterId, userId);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Chapter deleted.',
    });
  }
}
