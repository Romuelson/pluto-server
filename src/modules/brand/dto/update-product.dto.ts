import { PartialType } from '@nestjs/swagger';
import { CreateBrandDTO } from './create-brand.dto';

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
