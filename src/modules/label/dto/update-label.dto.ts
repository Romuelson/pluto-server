import { PartialType } from '@nestjs/swagger';
import { CreateLabelDTO } from './create-label.dto';

export class UpdateLabelDTO extends PartialType(CreateLabelDTO) {}
