import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayLoadDto } from '../auth/dtos/token-payload.dto';
import { TokenPayLoadParam } from '../params/token-payload.param';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.findOne(id);
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Put()
  update(
    @Body() updateNoteDto: UpdateNoteDto,
    @TokenPayLoadParam() token: TokenPayLoadDto,
  ) {
    return this.noteService.update(updateNoteDto, token);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayLoadParam() token: TokenPayLoadDto,
  ) {
    return this.noteService.delete(id, token);
  }
}
