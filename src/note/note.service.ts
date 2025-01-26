import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateUserDto } from '../user/dtos/update-user.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll() {
    return await this.noteRepository.find();
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new BadRequestException('note not found.');
    return note;
  }

  async create(createNoteDto: CreateNoteDto) {
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
