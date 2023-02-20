import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IInstance } from '../interfaces/instance.interface';

import { InstanceContent } from 'src/modules/instance-content/schemas/instance-content.schema';
import { InstanceStore } from 'src/modules/instance-store/schemas/instance-store.schema';

export type InstanceDocument = Instance & Document<Types.ObjectId>;

@Schema()
export class Instance implements IInstance {
	@ApiProperty({ example: '634fd13777686cfe630ac245' })
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	})
	public product_id: Types.ObjectId;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: InstanceContent.name,
		autopopulate: true,
	})
	public content: InstanceContent | null;

	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: InstanceStore.name,
		autopopulate: true,
	})
	public store: InstanceStore | null;
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);

export const InstanceModel = {
	name: Instance.name,
	useFactory: () => {
		InstanceSchema.plugin(require('mongoose-autopopulate'));
		return InstanceSchema;
	},
};
