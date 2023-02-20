import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { TCreateInstanceDTO } from '../interfaces/instance.interface';

import { CreateInstanceContentDTO } from 'src/modules/instance-content/dto/create-instance-content.dto';
import { CreateInstanceStoreDTO } from 'src/modules/instance-store/dto/create-instance-store.dto';

export class CreateInstanceDTO implements TCreateInstanceDTO {
	@ApiProperty({ type: CreateInstanceContentDTO })
	@Type(() => CreateInstanceContentDTO)
	readonly instanceContentDTO: CreateInstanceContentDTO;

	@ApiProperty({ type: CreateInstanceStoreDTO })
	@Type(() => CreateInstanceStoreDTO)
	readonly instanceStoreDTO: CreateInstanceStoreDTO;
}
