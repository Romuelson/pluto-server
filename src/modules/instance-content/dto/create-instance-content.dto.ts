import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TCreateInstanceContentDTO } from '../interfaces/instance-content.interface';

import { Size } from 'src/modules/size/schemas/size.schema';
import { Color } from 'src/modules/color/schemas/color.schema';

export class CreateInstanceContentDTO implements TCreateInstanceContentDTO {
	@ApiProperty({ example: '63629e176897d3efb30cff58' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value))
	readonly size: Size;

	@ApiProperty({ example: '6361e747cb5d612a400f2a4b' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value))
	readonly color: Color;
}
