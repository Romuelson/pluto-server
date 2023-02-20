import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IInstanceStore } from '../interfaces/instance-store.interface';

export type InstanceStoreDocument = InstanceStore & Document;

@Schema({ collection: 'instancesStore' })
export class InstanceStore implements IInstanceStore {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Instance',
		required: true,
	})
	public instance_id: Types.ObjectId;

	@ApiProperty({ example: '2999' })
	@Prop({ type: Number, required: true })
	public price: number;

	@ApiProperty({ example: '10' })
	@Prop({ type: Number, required: true })
	public amount: number;

	@ApiProperty({ example: '10' })
	@Prop({ type: Number, required: true })
	public discount: number;

	@ApiProperty({ example: '10' })
	@Prop({ type: Number, required: true })
	public reserve: number;
}

export const InstanceStoreSchema = SchemaFactory.createForClass(InstanceStore);
export const InstanceStoreModel = { name: InstanceStore.name, schema: InstanceStoreSchema };
