import { PartialType } from '@nestjs/swagger';
import { CreateChapterDTO } from './create-chapter.dto';

export class UpdateChapterDTO extends PartialType(CreateChapterDTO) {}
