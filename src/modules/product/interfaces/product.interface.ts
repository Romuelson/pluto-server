import { Types } from 'mongoose';

import { TFileFields } from 'src/modules/file/interfaces/file.interface';
import { IInstanceImageFiles } from 'src/modules/instance-image/interfaces/instance-image.interface';

import { CreateProductViewDTO } from 'src/modules/product-view/dto/create-product-view.dto';
import { CreateInstanceDTO } from 'src/modules/instance/dto/create-instance.dto';

import { UpdateProductDTO } from '../dto/update-product.dto';
import { ProductContainerDTO } from '../models/container.model';

import { TCreateInstanceDTO } from 'src/modules/instance/interfaces/instance.interface';
import { TProductContainerCreateProps } from 'src/modules/product-container/interfaces/product-container.interface';

export interface IProduct {
	container: ProductContainerDTO | null;
}

export type TCreateProductDTO = {
	productViewDTO: CreateProductViewDTO;
	instanceDTO: CreateInstanceDTO;
};

export type TProductCreateProps = {
	createProductDTO: TCreateProductDTO;
	fileFields: TFileFields<keyof IInstanceImageFiles>;
};

export type TProductUpdateProps = {
	updateProductDTO: UpdateProductDTO;
	product_id: Types.ObjectId;
};

export type TProductQueueProps = TProductCreateProps;

export type TProductInstanceDTO = {
	product_id: string;
	instanceDTO: TCreateInstanceDTO;
};

export type TProductInstanceProps = {
	product_id: Types.ObjectId;
	instanceDTO: TCreateInstanceDTO;
};

export type TProductCreateInstance = {
	productInstanceProps: TProductInstanceProps;
	fileFields: TFileFields<keyof IInstanceImageFiles>;
};

export type TProductSyncContainerProps = {
	product_id: Types.ObjectId;
	containerProps?: Omit<TProductContainerCreateProps, 'product_id'>;
};
