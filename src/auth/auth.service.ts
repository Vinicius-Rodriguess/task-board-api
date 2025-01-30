import { BadRequestException, Injectable } from '@nestjs/common';
import { Bcrypt } from './bcript/bcript';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLogin } from './entitites/user-login.entity';
import { UserResponse } from './entitites/userResponse.entity';

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
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { password, ...response } = findUser;
      return response;
    }

    return null;
  }

  async login(userLogin: UserLogin) {
    const payload = { sub: userLogin.email };

    const findUser = await this.userService.findByEmail(userLogin.email);

    const userResponse: UserResponse = {
      id: findUser.id,
      name: findUser.name,
      email: userLogin.email,
      password: '',
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };

    return userResponse;
  }
}
