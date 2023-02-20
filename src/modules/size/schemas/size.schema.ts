import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ISize } from '../interfaces/size.interface';

export type SizeDocument = Size & Document<Types.ObjectId>;

@Schema()
export class Size implements ISize {
	@ApiProperty()
	@Prop({ type: String, required: true })
	public extent: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
export const SizeModel = { name: Size.name, schema: SizeSchema };
