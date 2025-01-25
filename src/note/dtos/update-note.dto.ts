import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsInt } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsInt()
  id: number;
}
