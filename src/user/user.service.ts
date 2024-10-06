import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.userRepository.update(
      { id: userId },
      { hashedRefreshToken },
    );
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
