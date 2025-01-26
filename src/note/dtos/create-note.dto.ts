import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  @IsOptional()
  fixed?: boolean;

  @IsNotEmpty()
  user: User;
}
