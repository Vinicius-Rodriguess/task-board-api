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
import { TokenPayLoadParam } from '../params/token-payload.param';
import { TokenPayLoadDto } from '../auth/dtos/token-payload.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userServise.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userServise.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userServise.findByEmail(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userServise.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayLoadParam() token: TokenPayLoadDto,
  ) {
    return this.userServise.update(updateUserDto, token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayLoadParam() token: TokenPayLoadDto,
  ) {
    return this.userServise.delete(id, token);
  }
}
