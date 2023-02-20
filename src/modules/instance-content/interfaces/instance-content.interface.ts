import { Types } from 'mongoose';

import { IColor } from 'src/modules/color/interfaces/color.interface';

import { Size } from 'src/modules/size/schemas/size.schema';
import { Color } from 'src/modules/color/schemas/color.schema';
import { InstanceImage } from 'src/modules/instance-image/schemas/instance-image.schema';

export interface IInstanceContent<I = InstanceImage> {
	product_id: Types.ObjectId;
	size: Size;
	color: Color;
	image: I;
}

export type TCreateInstanceContentDTO = Omit<IInstanceContent, 'product_id' | 'image'>;

export type TInstanceContentCreateProps = Pick<IInstanceContent, 'product_id' | 'image'> & {
	instanceContentDTO: TCreateInstanceContentDTO;
};

export type TInstanceContentGroup = Pick<IInstanceContent, 'product_id'> & {
	instance_id: Types.ObjectId;
};

export type RInstanceContentGroup = {
	instance_id: Types.ObjectId;
	color: IColor;
}[];
