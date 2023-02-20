import mongoose, { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IInstanceGroup } from '../interfaces/instance-group.interface';

import { Color } from 'src/modules/color/schemas/color.schema';

export type InstanceGroupDocument = InstanceGroup & Document<Types.ObjectId>;

@Schema({ collection: 'instancesContents' })
export class InstanceGroup implements IInstanceGroup {
	@ApiProperty()
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Color.name,
		autopopulate: true,
		required: true,
	})
	public color: Color;
}

export const InstanceGroupSchema = SchemaFactory.createForClass(InstanceGroup);

export const InstanceGroupModel = {
	name: InstanceGroup.name,
	useFactory: () => {
		InstanceGroupSchema.plugin(require('mongoose-autopopulate'));
		return InstanceGroupSchema;
	},
};
