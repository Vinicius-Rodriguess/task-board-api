import { IsEmail, IsString } from 'class-validator';

export class UserLogin {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}
