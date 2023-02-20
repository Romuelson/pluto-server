import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDTO {
	@ApiProperty({ example: 'Нижнее белье', description: 'Наименование' })
	@IsNotEmpty()
	@MinLength(4, { message: 'Мин. длина описания 4 символов' })
	@MaxLength(12, { message: 'Макс. длина описания 12 символов' })
	readonly name: string;

	@ApiProperty({ example: 'true', description: 'Состояние' })
	@IsNotEmpty()
	@IsBoolean()
	readonly state: boolean;

	@ApiProperty({ example: '1666026414729', description: 'Дата (Date.now)' })
	@IsNotEmpty()
	readonly createdAt: Date;
}
