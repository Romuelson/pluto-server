import { PartialType } from '@nestjs/swagger';
import { CreateLineDTO } from './create-line.dto';

export class UpdateLineDTO extends PartialType(CreateLineDTO) {}
