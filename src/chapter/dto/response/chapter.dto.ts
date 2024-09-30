import { IsNotEmpty } from 'class-validator';

export class ChapterResponse {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
