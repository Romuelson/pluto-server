import { plainToInstance, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TCreateProductDTO } from '../interfaces/product.interface';

import { CreateProductViewDTO } from 'src/modules/product-view/dto/create-product-view.dto';
import { CreateInstanceDTO } from 'src/modules/instance/dto/create-instance.dto';

export const TFileMulterArray = {
	type: 'array',
	items: {
		type: 'file',
		items: {
			type: 'string',
			format: 'binary',
		},
	},
};

export class CreateProductDTO implements TCreateProductDTO {
	@ApiProperty({ type: CreateProductViewDTO })
	@Transform(({ value }) => plainToInstance(CreateProductViewDTO, JSON.parse(value)))
	@Type(() => CreateProductViewDTO)
	readonly productViewDTO: CreateProductViewDTO;

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
