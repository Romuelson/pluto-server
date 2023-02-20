import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IMaterial } from '../interfaces/material.interface';

export class CreateMaterialDTO implements IMaterial {
	@ApiProperty({ example: 'Хлопок' })
	@IsString({ message: 'Требуется строковое значение' })
	readonly name: string;
}
