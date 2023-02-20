import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IBrand } from '../interfaces/brand.interface';

export class CreateBrandDTO implements IBrand {
	@ApiProperty({ example: 'Бюстгальтер' })
	@IsString()
	readonly name: string;
}
