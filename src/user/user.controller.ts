import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Get()
  findAll() {
    return this.userServise.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userServise.create(createUserDto);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userServise.update(updateUserDto);
  }
}
