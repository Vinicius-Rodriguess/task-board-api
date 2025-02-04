import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenPayLoadDto } from '../dtos/token-payload.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const userRequest = request.user as TokenPayLoadDto;

    if (!userRequest?.sub) throw new UnauthorizedException('Invalid token.');

    const user = await this.userService.findOne(Number(userRequest.sub));

    if (!user) throw new UnauthorizedException('User not found.');

    if (!user.isAdmin) throw new UnauthorizedException('You are not an admin.');

    return true;
  }
}
