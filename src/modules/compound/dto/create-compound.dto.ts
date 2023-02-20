import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

import { Material } from 'src/modules/material/schemas/material.schema';
import { ICreateCompoundDTO } from '../interfaces/compound.interface';

export class CreateCompoundDTO implements ICreateCompoundDTO {
	@ApiProperty({ example: '634fd13777686cfe630ac245' })
	@IsString({ message: 'Требуется строковое значение' })
	@Type(() => Material)
	readonly material_id: Material;

	@ApiProperty({ example: 90 })
	@Min(0, { message: 'Минимальное значение: 0' })
	@Max(100, { message: 'Максимальное значение: 100' })
	@IsNumber({}, { message: 'Требуется числовое значение' })
	readonly amount: number;
}
