import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsBoolean()
  fixed?: boolean;

  @IsNotEmpty()
  user: User;
}
