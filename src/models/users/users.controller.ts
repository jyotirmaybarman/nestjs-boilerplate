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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/users/entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns list of users',
    type: [User],
  })
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @ApiResponse({
    status: 201,
    type: User,
  })
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, type: User })
  async updateUser(@Param('id') id: string, @Body() data: UpdateuserDto) {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: User })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.removeUser(id);
  }
}
