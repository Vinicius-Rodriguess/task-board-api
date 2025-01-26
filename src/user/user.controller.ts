import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userServise.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userServise.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userServise.findByEmail(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userServise.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userServise.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userServise.delete(id);
  }
}
