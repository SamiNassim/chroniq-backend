import { IsNotEmpty } from 'class-validator';

export class ChapterResponse {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  number: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
