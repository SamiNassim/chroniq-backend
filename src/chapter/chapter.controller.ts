import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterRequest } from './dto/request/create-chapter.dto';

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
}
