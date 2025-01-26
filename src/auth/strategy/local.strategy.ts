import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    super();
    this._usernameField = 'email';
    this._passwordField = 'password';
  }

  async validate(user: string, password: string) {
    const validUser = await this.authService.validateUser(user, password);
    if (!validUser)
      throw new UnauthorizedException('Incorrect username and/or password');
    return validUser;
  }
}
