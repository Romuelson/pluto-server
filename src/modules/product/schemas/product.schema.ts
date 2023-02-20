import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IProduct } from '../interfaces/product.interface';

import { ProductContainerDTO } from '../models/container.model';

export type ProductDocument = Product & Document<Types.ObjectId>;

@Schema()
export class Product implements IProduct {
	@ApiProperty()
	@Prop({ type: ProductContainerDTO })
	public container: ProductContainerDTO | null;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModel = {
	name: Product.name,
	useFactory: () => {
		ProductSchema.plugin(require('mongoose-autopopulate'));
		return ProductSchema;
	},
};
