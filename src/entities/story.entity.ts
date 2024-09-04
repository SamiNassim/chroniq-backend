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
import { Like } from './like.entity';
import { Genre } from 'src/story/enums/genre.enum';
import { Comment } from './comment.entity';

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
  genre: Genre;

  @Column({ default: 0 })
  likesCounter: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.stories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[];

  @OneToMany(() => Comment, (comments) => comments.story)
  comments: Comment[];

  @OneToMany(() => Like, (likes) => likes.story)
  likes: Like[];

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
