import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class StoryResponse {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  storyCover: string;

  likesCounter: number;

  isPublished: boolean;

  isDeleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}
