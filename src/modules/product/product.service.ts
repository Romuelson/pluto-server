import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO, UpdateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
	) {}

	async create(createProductDTO: CreateProductDTO): Promise<Product> {
		const product = new this.productModel(createProductDTO).save();

		if (!product) {
			throw new HttpException(
				EHttpException.create,
				HttpStatus.NO_CONTENT,
			);
		}

		return product;
	}

	async findAll(): Promise<Product[]> {
		const products = this.productModel.find().exec();

		if (!products) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return products;
	}

	async findById(id: string): Promise<Product> {
		const product = await this.productModel.findById(id);

		if (!product) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return product;
	}

	async update(
		id: string,
		updateProductDTO: UpdateProductDTO,
	): Promise<Product> {
		const product = await this.productModel.findByIdAndUpdate(
			id,
			updateProductDTO,
			{ new: true },
		);

		if (!product) {
			throw new HttpException(
				EHttpException.update,
				HttpStatus.NOT_MODIFIED,
			);
		}

		return product;
	}

	async delete(id: string) {
		const product = this.productModel.findByIdAndRemove(id);

		if (!product) {
			throw new HttpException(
				EHttpException.delete,
				HttpStatus.NOT_MODIFIED,
			);
		}

		return product;
	}
}
