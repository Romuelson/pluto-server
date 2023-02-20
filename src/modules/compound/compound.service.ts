import { ModuleRef } from '@nestjs/core';
import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Compound, CompoundDocument } from './schemas/compound.schema';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import {
	CompoundWithProductList,
	CompoundWithProductProps,
	TCompoundCreateProps,
} from './interfaces/compound.interface';

import { ProductService } from '../product/product.service';

@Injectable()
export class CompoundService implements OnModuleInit {
	private productService: ProductService;

	constructor(
		@InjectModel(Compound.name) private compoundModel: Model<CompoundDocument>,
		private moduleRef: ModuleRef,
	) {}

	async onModuleInit() {
		this.productService = this.moduleRef.get(ProductService, { strict: false });
	}

	async compoundWithProduct(props: CompoundWithProductProps): Promise<CompoundWithProductList> {
		const { series_id } = props;

		return await this.compoundModel.aggregate([
			{
				$match: {
					series_id,
				},
			},
			{
				$lookup: {
					from: 'materials',
					localField: 'material_id',
					foreignField: '_id',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$project: {
					_id: 0,
					compound_id: '$_id',
					material: '$result.name',
					amount: 1,
				},
			},
		]);
	}

	async create({ createCompoundDTO, series_id }: TCompoundCreateProps) {
		const compounds = createCompoundDTO.map((compound) => ({ ...compound, series_id }));

		try {
			await this.compoundModel.insertMany(compounds);

			return await this.compoundWithProduct({ series_id });
		} catch (e) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}
	}

	async findAll(): Promise<Compound[]> {
		const res = await this.compoundModel.find().exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findById(id: string): Promise<Compound> {
		const res = await this.compoundModel.findById(id).exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	// async update(id: string, updateCompoundDTO: UpdateCompoundDTO): Promise<Compound> {
	// 	const res = await this.compoundModel
	// 		.findByIdAndUpdate(id, updateCompoundDTO, { new: true })
	// 		.exec();

	// 	if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

	// 	const { series_id } = res;
	// 	const { _id } = await this.productService.findBySeriesId(series_id);

	// 	const compound = await this.compoundWithProduct({ series_id });
	// 	await this.productService.update(String(_id), { compound });

	// 	return res;
	// }

	async delete(id: string) {
		const res = await this.compoundModel.findByIdAndRemove(id, { state: false }).exec();

		if (!res) throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);

		return res;
	}
}
