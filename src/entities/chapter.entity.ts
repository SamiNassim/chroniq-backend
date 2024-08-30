import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Story } from './story.entity';

@Entity()
export class Chapter extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  title: string;

  @ManyToOne(() => Story, (story) => story.chapters)
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
