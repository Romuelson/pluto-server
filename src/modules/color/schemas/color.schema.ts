import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IColor } from '../interfaces/color.interface';

export type ColorDocument = Color & Document<Types.ObjectId>;

@Schema()
export class Color implements IColor {
	@ApiProperty()
	@Prop({ type: String, required: true })
	public label: string;

	@ApiProperty()
	@Prop({ type: String, required: true })
	public rgb: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
export const ColorModel = { name: Color.name, schema: ColorSchema };
