import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TCreateInstanceStoreDTO } from '../interfaces/instance-store.interface';

export class CreateInstanceStoreDTO implements TCreateInstanceStoreDTO {
	@ApiProperty()
	@IsNumber()
	readonly price: number;

	@ApiProperty()
	@IsNumber()
	readonly amount: number;

	@ApiProperty()
	@IsNumber()
	readonly reserve: number;

	@ApiProperty()
	@IsNumber()
	readonly discount: number;
}
