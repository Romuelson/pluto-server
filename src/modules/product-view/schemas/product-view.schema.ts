import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IProductView } from '../interfaces/product-view.interface';

import { Chapter } from 'src/modules/chapter/schemas/chapter.schema';
import { Material } from 'src/modules/material/schemas/material.schema';
import { Brand } from 'src/modules/brand/schemas/brand.schema';
import { Line } from 'src/modules/line/schemas/line.schema';
import { Label } from 'src/modules/label/schemas/label.schema';

export type ProductViewDocument = ProductView & Document<Types.ObjectId>;

@Schema({ collection: 'productsViews' })
export class ProductView implements IProductView {
	@ApiProperty()
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
	public product_id: Types.ObjectId;

	@ApiProperty()
	@Prop({ type: String, required: true })
	public title: string;

	@ApiProperty()
	@Prop({ type: String, required: true })
	public description: string;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Chapter.name,
		autopopulate: true,
		required: true,
	})
	public chapter: Chapter;

	@ApiProperty()
	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: Material.name }],
		ref: Material.name,
		autopopulate: true,
		required: true,
	})
	public materials: Material[];

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Brand.name,
		autopopulate: true,
		required: true,
	})
	public brand: Brand;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Line.name,
		autopopulate: true,
		required: true,
	})
	public line: Line;

	@ApiProperty()
	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: Label.name }],
		autopopulate: true,
		required: true,
	})
	public labels: Label[];
}

export const ProductViewSchema = SchemaFactory.createForClass(ProductView);

export const ProductViewModel = {
	name: ProductView.name,
	useFactory: () => {
		ProductViewSchema.plugin(require('mongoose-autopopulate'));
		return ProductViewSchema;
	},
};
