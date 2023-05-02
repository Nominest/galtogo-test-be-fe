import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.schema';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('add')
  addUser(@Body() user: CreateUserDto): Promise<IUser> {
    return this.usersService.addUser(user);
  }

  @Get()
  getUser(): Promise<IUser[]> {
    return this.usersService.getUser();
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
