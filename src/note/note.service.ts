import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll() {
    return await this.noteRepository.find();
  }

  async create(createNoteDto: CreateNoteDto) {
    return await this.noteRepository.save(createNoteDto);
  }
}
