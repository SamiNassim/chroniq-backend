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
import { Chapter } from './chapter.entity';
import { Max, Min } from 'class-validator';
import { Story } from './story.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: null })
  @Min(1)
  @Max(5)
  averageRating: number;

  @ManyToOne(() => Story, (story) => story.ratings, { onDelete: 'CASCADE' })
  story: Story;

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
