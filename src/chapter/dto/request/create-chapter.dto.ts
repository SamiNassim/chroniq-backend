import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChapterRequest {
  @IsOptional()
  title: string;

  @IsNotEmpty()
  content: string;
}
