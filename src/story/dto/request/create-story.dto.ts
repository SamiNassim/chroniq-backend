import { IsNotEmpty, IsOptional } from 'class-validator';

export class StoryRequest {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  storyCover: string;
}
