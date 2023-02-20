import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { TProductViewCreateProps } from './interfaces/product-view.interface';
import { ProductView, ProductViewDocument } from './schemas/product-view.schema';

@Injectable()
export class ProductViewService {
	constructor(
		@InjectModel(ProductView.name) private productViewModel: Model<ProductViewDocument>,
	) {}

	async create(props: TProductViewCreateProps) {
		const { productViewDTO, product_id } = props;

		const res = await new this.productViewModel({ ...productViewDTO, product_id }).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}
}
