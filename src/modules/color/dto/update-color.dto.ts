import { PartialType } from '@nestjs/swagger';
import { CreateColorDTO } from './create-color.dto';

export class UpdateColorDTO extends PartialType(CreateColorDTO) {}
