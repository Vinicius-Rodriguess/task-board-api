import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Bcrypt } from './bcript/bcript';

@Module({
  controllers: [AuthController],
  providers: [Bcrypt],
  exports: [Bcrypt],
})
export class AuthModule {}
