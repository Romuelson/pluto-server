import { IsMongoId } from 'class-validator';
import { Transform, plainToInstance, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { TFileMulterArray } from './create-product.dto';

import { TProductInstanceDTO } from '../interfaces/product.interface';
import { CreateInstanceDTO } from 'src/modules/instance/dto/create-instance.dto';

export class CreateProductInstanceDTO implements TProductInstanceDTO {
	@ApiProperty({ example: '63629e176897d3efb30cff58' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	readonly product_id: string;

	@ApiProperty({ type: CreateInstanceDTO })
	@Transform(({ value }) => plainToInstance(CreateInstanceDTO, JSON.parse(value)))
	@Type(() => CreateInstanceDTO)
	readonly instanceDTO: CreateInstanceDTO;

	/* ... */

	@ApiProperty(TFileMulterArray)
	readonly frontside: Express.Multer.File[];

	@ApiProperty(TFileMulterArray)
	readonly backside: Express.Multer.File[];

	@ApiProperty(TFileMulterArray)
	readonly overallFrontside: Express.Multer.File[];

	@ApiProperty(TFileMulterArray)
	readonly overallBackside: Express.Multer.File[];

	@ApiProperty(TFileMulterArray)
	readonly productFrontside: Express.Multer.File[];

	@ApiProperty(TFileMulterArray)
	readonly productBackside: Express.Multer.File[];
}
