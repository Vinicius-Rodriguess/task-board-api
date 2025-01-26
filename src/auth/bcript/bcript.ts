import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async encryptPassword(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.SALT) || 10);
  }

  async comparePassword(password: string, passwordDb: string) {
    return await bcrypt.compare(password, passwordDb);
  }
}
