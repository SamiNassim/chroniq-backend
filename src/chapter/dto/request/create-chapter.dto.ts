import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChapterRequest {
  @IsNotEmpty()
  number: number;

  @IsOptional()
  title: string;

  @IsNotEmpty()
  content: string;
}
