import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ICreateFileResponse } from '../interfaces/file.interface';

export class CreateFileResponse implements ICreateFileResponse {
	@ApiProperty({ example: '' })
	@IsString()
	url: string;

	@ApiProperty({ example: '' })
	@IsString()
	name: string;
}
