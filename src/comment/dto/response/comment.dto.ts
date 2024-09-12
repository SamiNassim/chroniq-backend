import { IsNotEmpty } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CommentResponse {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  user: User;
  @IsNotEmpty()
  createdAt: string;
  @IsNotEmpty()
  updatedAt: string;
}
