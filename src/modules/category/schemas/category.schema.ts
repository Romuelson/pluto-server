import { Document } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
	@ApiProperty({ example: 'Нижнее белье', description: 'Наименование' })
	@Prop({ type: () => String, unique: true, required: true })
	public name: string;

	@ApiProperty({ example: 'true', description: 'Описание' })
	@Prop({ type: Boolean, default: true })
	public state: boolean;

	@ApiProperty({ example: 'true', description: 'Дата' })
	@Prop({ type: () => Date, default: Date.now })
	public createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const CategoryModel = { name: Category.name, schema: CategorySchema };
