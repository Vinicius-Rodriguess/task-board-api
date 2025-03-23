import { PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { IsInt } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsInt()
  id: number;
}
