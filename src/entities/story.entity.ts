import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Chapter } from './chapter.entity';
import { Max, Min } from 'class-validator';
import { Rating } from './rating.entity';
import { Genre } from 'src/story/enums/genre.enum';

@Entity()
export class Story extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  storyCover: string;

  @Column({
    type: 'enum',
    enum: Genre,
    default: null,
  })
  role: Genre;

  @Column({ default: null })
  @Min(1)
  @Max(5)
  averageRating: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.stories)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[];

  @OneToMany(() => Rating, (rating) => rating.story)
  ratings: Rating[];

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
