import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UserService } from '../user/user.service';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { TokenPayLoadDto } from '../auth/dtos/token-payload.dto';

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

  async update(updateNoteDto: UpdateNoteDto, token: TokenPayLoadDto) {
    const note = await this.findOne(updateNoteDto.id);

    if (note.user.id !== Number(token.sub)) {
      throw new ForbiddenException(
        'You do not have permission to modify this note.',
      );
    }

    const noteUpdated = {
      ...note,
      ...updateNoteDto,
    };

    return await this.noteRepository.save(noteUpdated);
  }

  async delete(id: number, token: TokenPayLoadDto) {
    const note = await this.findOne(id);

    if (note.user.id !== Number(token.sub)) {
      throw new ForbiddenException(
        'You do not have permission to modify this note.',
      );
    }

    return await this.noteRepository.remove(note);
  }
}
