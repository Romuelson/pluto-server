import { ApiProperty } from '@nestjs/swagger';

import { MinLength, MaxLength, IsBoolean, IsString, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

import { ECategoryNames } from 'src/modules/category/enum/category.enum';
import { Category } from 'src/modules/category/schemas/category.schema';

export class CreateChapterDTO {
	@ApiProperty({ example: 'Бюстгальтер' })
	@IsString()
	@MinLength(4, { message: 'Мин. длина описания 4 символов' })
	@MaxLength(12, { message: 'Макс. длина описания 12 символов' })
	readonly name: string;

	@ApiProperty({ example: ECategoryNames.underwear })
	@ValidateNested()
	@Type(() => Category)
	readonly category: Category;

	@ApiProperty({ example: true })
	@IsBoolean()
	readonly state: boolean;

	@ApiProperty({ example: '1666026414729' })
	@IsDate()
	readonly createdAt: Date;
}
