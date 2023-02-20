import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ILabel } from '../interfaces/label.interface';

export type LabelDocument = Label & Document<Types.ObjectId>;

@Schema()
export class Label implements ILabel {
	@ApiProperty()
	@Prop({ type: String, required: true })
	public name: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
export const LabelModel = { name: Label.name, schema: LabelSchema };
