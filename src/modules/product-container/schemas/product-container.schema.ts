import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IProductContainer } from '../interfaces/product-container.interface';

import { Instance } from 'src/modules/instance/schemas/instance.schema';
import { ProductView } from 'src/modules/product-view/schemas/product-view.schema';

import { Group } from '../models/group.model';
import { Type } from 'class-transformer';

export type ProductContainerDocument = ProductContainer & Document<Types.ObjectId>;

@Schema({ collection: 'productsContainers' })
export class ProductContainer implements IProductContainer {
	@ApiProperty()
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
	public product_id: Types.ObjectId;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: ProductView.name,
		autopopulate: true,
		required: true,
	})
	public viewDefault: ProductView;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Instance.name,
		autopopulate: true,
		required: true,
	})
	public viewInstance: Instance;

	@ApiProperty({ type: [Group] })
	@Prop({ type: Group })
	@Type(() => Group)
	public group: Group[];
}

export const ProductContainerSchema = SchemaFactory.createForClass(ProductContainer);

export const ProductContainerModel = {
	name: ProductContainer.name,
	useFactory: () => {
		ProductContainerSchema.plugin(require('mongoose-autopopulate'));
		return ProductContainerSchema;
	},
};
