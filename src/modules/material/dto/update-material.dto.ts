import { PartialType } from '@nestjs/swagger';
import { CreateMaterialDTO } from './create-material.dto';

export class UpdateMaterialDTO extends PartialType(CreateMaterialDTO) {}
