import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';
import { User } from './user.entity';
import { Story } from './story.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.comments, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter;

  @ManyToOne(() => Story, (story) => story.comments, { onDelete: 'CASCADE' })
  story: Story;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
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
