import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from 'src/auth/enums/role.enum';
import { createId } from '@paralleldrive/cuid2';
import { Story } from './story.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity()
@Unique(['email', 'username'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => Story, (story) => story.user)
  stories: Story[];

  @OneToMany(() => Like, (likes) => likes.user)
  likes: Like[];

  @OneToMany(() => Comment, (comments) => comments.user)
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
