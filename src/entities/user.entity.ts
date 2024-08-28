import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from 'src/auth/enums/role.enum';
import { createId } from '@paralleldrive/cuid2';

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
