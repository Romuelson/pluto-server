import { Types } from 'mongoose';

import { Instance } from 'src/modules/instance/schemas/instance.schema';
import { ProductView } from 'src/modules/product-view/schemas/product-view.schema';

import { UpdateProductContainerDTO } from '../dto/update-product-container.dto';
import { Group } from '../models/group.model';

export interface IProductContainer<G = ProductView, I = Instance> {
	product_id: Types.ObjectId;

	viewDefault: G;
	viewInstance: I;

	group: Group[];
}

// export type TProductContainerCreateProps = Omit<IProductContainer, 'group'>;
export type TProductContainerCreateProps = Pick<IProductContainer, 'product_id'> & {
	viewDefault: Types.ObjectId;
	viewInstance: Types.ObjectId;
};

export type TProductContainerUpdateProps = {
	updateProductContainerDTO: UpdateProductContainerDTO;
	product_id: Types.ObjectId;
};
