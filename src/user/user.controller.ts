import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

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
}
