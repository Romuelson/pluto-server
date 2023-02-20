import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ILine } from '../interfaces/line.interface';

export type LineDocument = Line & Document<Types.ObjectId>;

@Schema()
export class Line implements ILine {
	@ApiProperty({ example: 'Базовая коллекция' })
	@Prop({ type: String, required: true })
	public name: string;
}

export const LineSchema = SchemaFactory.createForClass(Line);
export const LineModel = { name: Line.name, schema: LineSchema };
