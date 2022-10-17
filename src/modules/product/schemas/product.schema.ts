import mongoose, { Document } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type } from 'class-transformer';
import { Image } from './classes/image.nesting';

import { Category } from 'src/modules/category/schemas/category.schema';
import { ECategoryNames } from 'src/modules/category/enum/category.enum';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
	@ApiProperty({ example: 'Бюстгальтер', description: 'Наименование' })
	@Prop({ type: () => String, required: true })
	public title: string;

	@ApiProperty({ example: 'Коллекция белья', description: 'Описание' })
	@Prop({ type: () => String, required: true })
	public description: string;

	/* вынести в отдельную сущность  */
	@ApiProperty({ description: 'Наименования изображений' })
	@Prop({ type: () => Image, required: true })
	@Type(() => Image)
	public image: Image;

	@ApiProperty({
		example: [ECategoryNames.underwear],
		description: 'Список категории',
	})
	@Prop({
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: Category.name,
				autopopulate: true,
			},
		],
		required: true,
	})
	@Type(() => Category)
	public category: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const ProductModel = { name: Product.name, schema: ProductSchema };
