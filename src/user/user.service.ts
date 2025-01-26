import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Bcrypt } from '../auth/bcript/bcript';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.findByEmail(createUserDto.email);
    if (findUser) throw new BadRequestException('Email já cadastrado!');

    createUserDto.password = await this.bcript.encryptPassword(
      createUserDto.password,
    );

    return await this.userRepository.save(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto) {
    const findUser = await this.findByEmail(updateUserDto.email);
    if (findUser && findUser.id !== updateUserDto.id)
      throw new BadRequestException('Email já cadastrado!');

    updateUserDto.password = await this.bcript.encryptPassword(
      updateUserDto.password,
    );

    return await this.userRepository.save(updateUserDto);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
