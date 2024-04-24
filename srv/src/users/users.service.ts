import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

interface PaginatedUsers {
  page: number;
  perPage: number;
  totalPages: number;
  users: UsersEntity[];
}
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(page?: number, perPage?: number): Promise<PaginatedUsers> {
    const users = await this.usersRepo.find();

    if (page && perPage) {
      const totalPages = Math.ceil(users.length / perPage);

      const firstUserIndex = (page - 1) * perPage;
      const lastUserIndex = page * perPage <= users.length - 1 ? page * perPage : users.length - 1;
      const usersPerPage = users.slice(firstUserIndex, lastUserIndex);

      return {
        page: page,
        perPage: perPage,
        totalPages: totalPages,
        users: usersPerPage,
      };
    } else {
      return {
        page: 1,
        perPage: users.length,
        totalPages: 1,
        users: users,
      };
    }
  }
}
