import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IInstanceContent } from '../interfaces/instance-content.interface';

import { Size } from 'src/modules/size/schemas/size.schema';
import { Color } from 'src/modules/color/schemas/color.schema';
import { InstanceImage } from 'src/modules/instance-image/schemas/instance-image.schema';

export type InstanceContentDocument = InstanceContent & Document<Types.ObjectId>;

@Schema({ collection: 'instancesContents' })
export class InstanceContent implements IInstanceContent {
	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	})
	public product_id: Types.ObjectId;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Size.name,
		autopopulate: true,
		required: true,
	})
	public size: Size;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Color.name,
		autopopulate: true,
		required: true,
	})
	public color: Color;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: InstanceImage.name,
		autopopulate: true,
		required: true,
	})
	public image: InstanceImage;
}

export const InstanceContentSchema = SchemaFactory.createForClass(InstanceContent);

export const InstanceContentModel = {
	name: InstanceContent.name,
	useFactory: () => {
		InstanceContentSchema.plugin(require('mongoose-autopopulate'));
		return InstanceContentSchema;
	},
};
