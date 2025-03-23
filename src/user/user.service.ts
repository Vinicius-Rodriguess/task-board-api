import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Bcrypt } from '../auth/bcript/bcript';
import { TokenPayLoadDto } from '../auth/dtos/token-payload.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailservice: EmailService,
    private readonly bcript: Bcrypt,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        notes: true,
      },
    });
    if (!user) throw new BadRequestException('User not found.');
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: ILike(`%${email}%`) },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.findByEmail(createUserDto.email);
    if (findUser) throw new BadRequestException('Email already registered.');

    createUserDto.password = await this.bcript.encryptPassword(
      createUserDto.password,
    );

    await this.emailservice.sendEmail(createUserDto);

    return await this.userRepository.save(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto, token: TokenPayLoadDto) {
    const user = await this.findOne(updateUserDto.id);

    if (updateUserDto.id !== Number(token.sub)) {
      throw new ForbiddenException(
        'You do not have permission to modify this user.',
      );
    }

    const userSameEmail = await this.findByEmail(updateUserDto.email);

    if (userSameEmail && userSameEmail.id !== updateUserDto.id) {
      throw new BadRequestException('Email already registered.');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcript.encryptPassword(
        updateUserDto.password,
      );
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    return await this.userRepository.save(updatedUser);
  }

  async delete(id: number, token: TokenPayLoadDto) {
    const user = await this.findOne(id);

    if (user.id !== Number(token.sub)) {
      throw new ForbiddenException(
        'You do not have permission to modify this user.',
      );
    }

    return await this.userRepository.remove(user);
  }
}
