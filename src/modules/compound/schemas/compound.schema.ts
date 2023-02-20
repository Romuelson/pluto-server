import mongoose, { Document } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICompound } from '../interfaces/compound.interface';
import { Material } from 'src/modules/material/schemas/material.schema';

export type CompoundDocument = Compound & Document;

@Schema()
export class Compound implements ICompound {
	public _id: mongoose.Schema.Types.ObjectId;

	@ApiProperty({ type: String })
	@Prop({ type: String, required: true })
	public series_id: string;

	@ApiProperty({ example: '634fd13777686cfe630ac245' })
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Material.name,
		required: true,
	})
	public material_id: Material;

	@ApiProperty({ example: 90 })
	@Prop({ type: Number, required: true })
	public amount: number;
}

export const CompoundSchema = SchemaFactory.createForClass(Compound);
export const CompoundModel = { name: Compound.name, schema: CompoundSchema };
