import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Get()
  // getAll(): object {
  //   return this.usersService.getUsers();
  // }
  // @Post('add')
  // create(): string {
  //   return 'This adds a new user';
  // }

  @Get('all')
  findAll(): object {
    return this.usersService.findAll();
  }
}
