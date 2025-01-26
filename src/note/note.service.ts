import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.noteRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!note) throw new BadRequestException('note not found.');
    return note;
  }

  async create(createNoteDto: CreateNoteDto) {
    await this.userService.findOne(createNoteDto.user.id);
    return await this.noteRepository.save(createNoteDto);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.noteRepository.save(updateUserDto);
  }

  async delete(id: number) {
    const note = await this.findOne(id);
    return await this.noteRepository.remove(note);
  }
}
