import { BadRequestException, Injectable } from '@nestjs/common';
import { Bcrypt } from './bcript/bcript';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserResponseDto } from './dtos/userResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);
    if (!findUser) throw new BadRequestException('User not found.');

    const matchPassword = await this.bcrypt.comparePassword(
      password,
      findUser.password,
    );

    if (findUser && matchPassword) {
      delete findUser.password;
      return findUser;
    }

    return null;
  }

  async login(userLogin: UserLoginDto) {
    const findUser = await this.userService.findByEmail(userLogin.email);

    const payload = { sub: findUser.id };

    const userResponse: UserResponseDto = {
      id: findUser.id,
      name: findUser.name,
      email: userLogin.email,
      password: '',
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };

    return userResponse;
  }
}
