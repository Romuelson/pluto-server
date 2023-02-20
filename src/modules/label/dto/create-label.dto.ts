import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ILabel } from '../interfaces/label.interface';

export class CreateLabelDTO implements ILabel {
	@ApiProperty({ example: 'Бюстгальтер' })
	@IsString()
	readonly name: string;
}
