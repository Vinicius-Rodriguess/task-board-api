import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id: number;
}
