import { PartialType } from '@nestjs/swagger';
import { CreateCompoundDTO } from './create-compound.dto';

export class UpdateCompoundDTO extends PartialType(CreateCompoundDTO) {}
