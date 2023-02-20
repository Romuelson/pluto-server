import { PartialType } from '@nestjs/swagger';
import { Instance } from '../schemas/instance.schema';

export class UpdateInstanceDTO extends PartialType(Instance) {}
