import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Story } from './story.entity';
import { User } from './user.entity';

@Entity()
@Unique(['user', 'story'])
export class Like extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Story, (story) => story.likes, { onDelete: 'CASCADE' })
  @Index()
  story: Story;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @Index()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    super();
    // Generate a CUID for the primary key
    this.id = createId();
  }
}
