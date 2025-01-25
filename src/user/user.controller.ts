import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Get()
  findAll() {
    return this.userServise.findAll();
  }

}
