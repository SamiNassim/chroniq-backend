import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Story } from './story.entity';
import { Comment } from './comment.entity';

@Entity()
export class Chapter extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  title: string;

  @ManyToOne(() => Story, (story) => story.chapters, { onDelete: 'CASCADE' })
  story: Story;

  @OneToMany(() => Comment, (comments) => comments.chapter)
  comments: Comment[];

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
