import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { Image } from '../schemas/classes/image.nesting';

import { Category } from 'src/modules/category/schemas/category.schema';
import { ECategoryNames } from 'src/modules/category/enum/category.enum';

export class CreateProductDTO {
	@ApiProperty({ example: 'Бюстгальтер', description: 'Наименование' })
	@IsNotEmpty()
	@MinLength(4, { message: 'Мин. длина заголовка 4 символа' })
	@MaxLength(20, { message: 'Макс. длина заголовка 20 символов' })
	readonly title: string;

	@ApiProperty({ example: 'Коллекция белья', description: 'Описание' })
	@IsNotEmpty()
	@MinLength(8, { message: 'Мин. длина описания 8 символов' })
	@MaxLength(250, { message: 'Макс. длина описания 250 символов' })
	readonly description: string;

	@ApiProperty({ description: 'Наименования изображений' })
	@IsNotEmpty()
	readonly image: Image;

	@ApiProperty({
		example: [ECategoryNames.underwear],
		description: 'Список категории',
	})
	@IsNotEmpty()
	readonly category: Category[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
