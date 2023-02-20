import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ILine } from '../interfaces/line.interface';

export class CreateLineDTO implements ILine {
	@ApiProperty({ example: 'Базовая коллекция' })
	@IsString()
	readonly name: string;
}
