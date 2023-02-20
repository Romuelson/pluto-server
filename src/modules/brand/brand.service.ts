import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateBrandDTO } from './dto/create-brand.dto';
import { UpdateBrandDTO } from './dto/update-product.dto';

import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
	constructor(
		@InjectModel(Brand.name)
		private brandModel: Model<BrandDocument>,
	) {}

	async create(createBrandDTO: CreateBrandDTO): Promise<Brand> {
		const brand = new this.brandModel(createBrandDTO).save();

		if (!brand) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return brand;
	}

	async findAll(): Promise<Brand[]> {
		const brands = this.brandModel.find().exec();

		if (!brands) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return brands;
	}

	async findById(id: string): Promise<Brand> {
		const brand = await this.brandModel.findById(id);

		if (!brand) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return brand;
	}

	async update(id: string, categoryBrandDTO: UpdateBrandDTO): Promise<Brand> {
		const brand = await this.brandModel.findByIdAndUpdate(id, categoryBrandDTO, { new: true });

		if (!brand) {
			throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);
		}

		return brand;
	}

	async delete(id: string) {
		const brand = this.brandModel.findByIdAndRemove(id, {
			state: false,
		});

		if (!brand) {
			throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);
		}

		return brand;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.brandModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}

	// async syncBrand(id: string): Promise<{ brand: IBrandProduct }> {
	// 	try {
	// 		const { _id, name } = await this.findById(id);

	// 		return {
	// 			brand: {
	// 				brand_id: _id,
	// 				name: name,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
	// 	}
	// }
}
