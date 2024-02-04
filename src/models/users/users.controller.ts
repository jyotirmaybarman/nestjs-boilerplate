import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateuserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateuserDto) {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.removeUser(id);
  }
}
