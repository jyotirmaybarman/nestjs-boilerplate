import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateuserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/providers/typeorm/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async createUser(data: CreateUserDto) {
    let user = await this.userRepository.findOne({
      where: {
        email: data.email
      }
    });

    if(user) throw new BadRequestException({
      message: 'email address already exists'
    })

    user = this.userRepository.create(data)
    await this.userRepository.save(user);

    return user;
  }

  async getUsers() {
    const users = await this.userRepository.find()
    return users;
  }

  async updateUser(id: string, data: UpdateuserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if(!user) throw new NotFoundException({
      message: 'user does not exist'
    })

    data.email ? user.email = data.email : null
    data.first_name ? user.first_name = data.first_name : null
    data.middle_name ? user.middle_name = data.middle_name : null
    data.last_name ? user.last_name = data.last_name : null
    this.userRepository.save(user);

    return user;
  }

  async removeUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if(!user) throw new NotFoundException({
      message: 'user does not exist'
    })

    this.userRepository.delete(user);
    return user;
  }
}
