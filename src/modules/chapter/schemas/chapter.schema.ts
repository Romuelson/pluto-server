import mongoose, { Document } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Category } from 'src/modules/category/schemas/category.schema';
import { ECategoryNames } from 'src/modules/category/enum/category.enum';

export type ChapterDocument = Chapter & Document;

@Schema()
export class Chapter {
	@ApiProperty({ example: 'Бюстгальтер', description: 'Наименование' })
	@Prop({ type: () => String, unique: true, required: true })
	public name: string;

	@ApiProperty({
		example: ECategoryNames.underwear,
		description: 'Категория',
	})
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Category.name,
		autopopulate: true,
		required: true,
	})
	public category: Category;

	@ApiProperty({ example: 'true', description: 'Состояние' })
	@Prop({ type: () => Boolean, default: true })
	public state: boolean;

	@ApiProperty({ example: '1666026414729', description: 'Дата (Date.now)' })
	@Prop({ type: () => Date, default: Date.now })
	public createdAt: Date;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);

export const ChapterModel = {
	name: Chapter.name,
	useFactory: () => ChapterSchema.plugin(require('mongoose-autopopulate')),
};
