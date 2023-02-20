import mongoose, { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IInstanceImage } from '../interfaces/instance-image.interface';
import { EMediaType, EExtensionType } from 'src/modules/file/enum/image.enum';

export type InstanceImageDocument = InstanceImage & Document;

@Schema({ collection: 'instancesImages' })
export class InstanceImage implements IInstanceImage {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Instance',
		required: true,
	})
	public instance_id: Types.ObjectId;

	@Prop({ type: String, required: true })
	public filename: string;

	@Prop({ type: typeof EMediaType, enum: EMediaType, required: true })
	public mediaTypes: typeof EMediaType;

	@Prop({ type: typeof EExtensionType, enum: EExtensionType, required: true })
	public extencionTypes: typeof EExtensionType;
}

export const InstanceImageSchema = SchemaFactory.createForClass(InstanceImage);
export const InstanceImageModel = { name: InstanceImage.name, schema: InstanceImageSchema };
