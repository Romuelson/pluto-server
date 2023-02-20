import { Document, Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBrand } from '../interfaces/brand.interface';

export type BrandDocument = Brand & Document<Types.ObjectId>;

@Schema()
export class Brand implements IBrand {
	@ApiProperty()
	@Prop({ type: String, required: true })
	public name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
export const BrandModel = { name: Brand.name, schema: BrandSchema };
