import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query) {
    this.logger.log('Get all users');

    const page = Number(query.page);
    const perPage = Number(query.perPage);

    let paginatedUsers;

    if (Number.isInteger(page) && Number.isInteger(perPage)) {
      paginatedUsers = await this.userService.findAll(page, perPage);
    } else {
      paginatedUsers = await this.userService.findAll();
    }

    return {
      ...paginatedUsers,
      users: paginatedUsers.users.map((user) => UsersResponseDto.fromUsersEntity(user)),
    };
  }
}
