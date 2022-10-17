import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// export type ImageDocument = Image & Document;

// @Schema({ _id: false })
export class Image {
	@ApiProperty({ example: '47cb59b55397' })
	@Prop({ type: String, required: true })
	public frontside: string;

	@ApiProperty({ example: '864c59a36f21' })
	@Prop({ type: String, unique: true, required: true })
	public backside: string;

	@ApiProperty({ example: '8f7d4aa73dbd' })
	@Prop({ type: String, unique: true, required: true })
	public overallFrontside: string;

	@ApiProperty({ example: 'c668b1bbee30' })
	@Prop({ type: String, unique: true, required: true })
	public overallBackside: string;

	@ApiProperty({ example: '911b7feef9fa' })
	@Prop({ type: String, unique: true, required: true })
	public productFrontside: string;

	@ApiProperty({ example: '26093add92f1' })
	@Prop({ type: String, unique: true, required: true })
	public productBackside: string;
}

// export const ImageSchema = SchemaFactory.createForClass(Image);
// export const ImageModel = { name: Image.name, schema: ImageSchema };
