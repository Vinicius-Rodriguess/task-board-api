import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dtos/create-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }
}
