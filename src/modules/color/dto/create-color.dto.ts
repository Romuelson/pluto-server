import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IColor } from '../interfaces/color.interface';

export class CreateColorDTO implements IColor {
	@ApiProperty({ example: 'Мята' })
	@IsString()
	readonly label: string;

	@ApiProperty({ example: '#e3efe2' })
	@IsString()
	readonly rgb: string;
}
