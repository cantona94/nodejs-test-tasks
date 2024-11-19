import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findUsersWithProblems() {
    const usersWithProblems: { count: string }[] = await this.usersRepository
      .query(`
      SELECT COUNT(*) as count FROM users WHERE problem=true
    `);

    if (usersWithProblems[0].count === '0') {
      return 'Users not have problems!';
    }

    await this.usersRepository.query(`
      UPDATE users SET problem = false WHERE problem = true
    `);

    return `${usersWithProblems[0].count} пользователя имели проблемы!`;
  }
}
