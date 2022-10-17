import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDTO {
	@ApiProperty({ example: 'Нижнее белье', description: 'Наименование' })
	@IsNotEmpty()
	@MinLength(4, { message: 'Мин. длина описания 4 символов' })
	@MaxLength(12, { message: 'Макс. длина описания 12 символов' })
	readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
