import { PartialType } from '@nestjs/mapped-types';
import { ChapterRequest } from './create-chapter.dto';

export class UpdateChapterRequest extends PartialType(ChapterRequest) {}
