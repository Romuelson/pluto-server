import { Types } from 'mongoose';

import { Brand } from 'src/modules/brand/schemas/brand.schema';
import { Chapter } from 'src/modules/chapter/schemas/chapter.schema';
import { Label } from 'src/modules/label/schemas/label.schema';
import { Line } from 'src/modules/line/schemas/line.schema';
import { Material } from 'src/modules/material/schemas/material.schema';

export interface IProductView {
	product_id: Types.ObjectId;
	title: string;
	description: string;
	chapter: Chapter;
	materials: Material[];
	brand: Brand;
	line: Line;
	labels: Label[];
}

export type TCreateProductViewDTO = Omit<IProductView, 'product_id'>;

export type TProductViewCreateProps = Pick<IProductView, 'product_id'> & {
	productViewDTO: TCreateProductViewDTO;
};
