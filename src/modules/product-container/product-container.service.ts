import { Model, PopulateOptions, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import {
	TProductContainerCreateProps,
	TProductContainerUpdateProps,
} from './interfaces/product-container.interface';

import { ProductContainer, ProductContainerDocument } from './schemas/product-container.schema';

import { InstanceContentService } from '../instance-content/instance-content.service';

import { Group } from './models/group.model';

import { ColorModel } from '../color/schemas/color.schema';
import { SizeModel } from '../size/schemas/size.schema';

@Injectable()
export class ProductContainerService {
	constructor(
		@InjectModel(ProductContainer.name)
		private readonly productContainerModel: Model<ProductContainerDocument>,
		private readonly instanceContentService: InstanceContentService,
	) {}

	async create(props: TProductContainerCreateProps) {
		const group = await this.aggregateGroup(props.product_id);

		const model = { group, ...props };

		const res = await new this.productContainerModel(model).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async aggregateGroup(product_id: Types.ObjectId) {
		const docs = await this.productContainerModel
			.aggregate<Group>([
				{
					$match: { product_id },
				},
				{
					$lookup: {
						from: 'instances',
						let: {
							thisProduct: '$product_id',
							thisInstance: '$viewInstance',
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$product_id', '$$thisProduct'],
											},
											{
												$ne: ['$_id', '$$thisInstance'],
											},
										],
									},
								},
							},
						],
						as: 'instances',
					},
				},
				{
					$unwind: {
						path: '$instances',
					},
				},
				{
					$lookup: {
						from: 'instancesContents',
						let: {
							content: '$instances.content',
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ['$_id', '$$content'],
									},
								},
							},
						],
						as: 'contents',
					},
				},
				{
					$unwind: {
						path: '$contents',
					},
				},
				{
					$group: {
						_id: '$contents.color',
						sizes: {
							$push: {
								instance_id: '$instances._id',
								size: '$contents.size',
							},
						},
					},
				},
				{
					$project: {
						_id: 0,
						color: '$_id',
						sizes: 1,
					},
				},
			])
			.exec();

		const colorPopulateOptions: PopulateOptions = {
			path: 'color',
			model: ColorModel.name,
			select: '-_id -__v',
		};

		const sizePopulateOptions: PopulateOptions = {
			path: 'sizes.size ',
			model: SizeModel.name,
			select: '-_id -__v',
		};

		const populateOptions: Array<PopulateOptions> = [colorPopulateOptions, sizePopulateOptions];

		return (await this.productContainerModel.populate(
			docs,
			populateOptions,
		)) as unknown as Group[];
	}

	async findById(id: Types.ObjectId): Promise<ProductContainerDocument> {
		const res = await this.productContainerModel.findById(id).select('-_id -__v').exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async update(props: TProductContainerUpdateProps) {
		const { updateProductContainerDTO, product_id } = props;

		const res = await this.productContainerModel.findOneAndUpdate(
			{ product_id },
			updateProductContainerDTO,
			{
				new: true,
			},
		);

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}
}
