import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './create-user.dto';
import { IsInt } from 'class-validator';

export class updateUserDto extends PartialType(createUserDto) {
  @IsInt()
  id: number;
}
