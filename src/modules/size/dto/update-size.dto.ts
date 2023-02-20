import { PartialType } from '@nestjs/swagger';
import { CreateSizeDTO } from './create-size.dto';

export class UpdateSizeDTO extends PartialType(CreateSizeDTO) {}
