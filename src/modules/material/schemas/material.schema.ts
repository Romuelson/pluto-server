import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IMaterial } from '../interfaces/material.interface';

export type MaterialDocument = Material & Document<Types.ObjectId>;

@Schema()
export class Material implements IMaterial {
	@ApiProperty({ example: 'Хлопок' })
	@Prop({ type: String, required: true })
	public name: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
export const MaterialModel = { name: Material.name, schema: MaterialSchema };
