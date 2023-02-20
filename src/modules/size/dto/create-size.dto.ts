import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ISize } from '../interfaces/size.interface';

export class CreateSizeDTO implements ISize {
	@ApiProperty({ example: 'XS' })
	@IsString()
	readonly extent: string;
}
