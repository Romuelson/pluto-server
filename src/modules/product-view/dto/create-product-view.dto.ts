import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TCreateProductViewDTO } from '../interfaces/product-view.interface';
import { Chapter } from 'src/modules/chapter/schemas/chapter.schema';
import { Material } from 'src/modules/material/schemas/material.schema';
import { Brand } from 'src/modules/brand/schemas/brand.schema';
import { Line } from 'src/modules/line/schemas/line.schema';
import { Label } from 'src/modules/label/schemas/label.schema';

export class CreateProductViewDTO implements TCreateProductViewDTO {
	@ApiProperty({ example: 'Бюстгальтер' })
	@MinLength(4, { message: 'Мин. длина заголовка 4 символа' })
	@MaxLength(20, { message: 'Макс. длина заголовка 20 символов' })
	@IsString({ message: 'Требуется строковое значение' })
	readonly title: string;

	@ApiProperty({ example: 'Коллекция белья' })
	@MinLength(8, { message: 'Мин. длина описания 8 символов' })
	@MaxLength(250, { message: 'Макс. длина описания 250 символов' })
	@IsString({ message: 'Требуется строковое значение' })
	readonly description: string;

	@ApiProperty({ example: '634e8d2b3f3a8e24978de274' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value))
	@Type(() => Chapter)
	readonly chapter: Chapter;

	@ApiProperty({ example: ['634fd13777686cfe630ac245', '634fd14577686cfe630ac247'] })
	@IsMongoId({ message: 'Требуется корректный ObjectId', each: true })
	@Transform(({ value }: { value: string[] }) => value.map((item) => new Types.ObjectId(item)))
	@Type(() => Material)
	readonly materials: Material[];

	@ApiProperty({ example: '635fd2007785ecdc556466f0' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value))
	@Type(() => Brand)
	readonly brand: Brand;

	@ApiProperty({ example: '6360197f23f6275f0206a81a' })
	@IsMongoId({ message: 'Требуется корректный ObjectId' })
	@Transform(({ value }: { value: string }) => new Types.ObjectId(value))
	@Type(() => Line)
	readonly line: Line;

	@ApiProperty({ example: ['63615599d479cc6f46900bcb', '63615a6ab3889349af06a041'] })
	@IsMongoId({ message: 'Требуется корректный ObjectId', each: true })
	@Transform(({ value }: { value: string[] }) => value.map((item) => new Types.ObjectId(item)))
	@Type(() => Label)
	readonly labels: Label[];
}
