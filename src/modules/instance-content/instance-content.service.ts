import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import {
	TInstanceContentGroup,
	TInstanceContentCreateProps,
	RInstanceContentGroup,
} from './interfaces/instance-content.interface';

import { InstanceContent, InstanceContentDocument } from './schemas/instance-content.schema';

@Injectable()
export class InstanceContentService {
	constructor(
		@InjectModel(InstanceContent.name)
		private readonly instanceContentModel: Model<InstanceContentDocument>,
	) {}

	async create(props: TInstanceContentCreateProps): Promise<InstanceContentDocument> {
		const { instanceContentDTO, image, product_id } = props;

		const res = await new this.instanceContentModel({
			...instanceContentDTO,
			image,
			product_id,
		}).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async aggregateGroup(props: TInstanceContentGroup): Promise<RInstanceContentGroup> {
		const { product_id, instance_id } = props;

		return await this.instanceContentModel.aggregate([
			{
				$match: { product_id },
			},
			{
				$lookup: {
					from: 'colors',
					localField: 'color',
					foreignField: '_id',
					as: 'result',
				},
			},
			{
				$unwind: { path: '$result' },
			},
			{
				$group: {
					_id: null,
					group: {
						$push: {
							instance_id: '$_id',
							color: {
								color_id: '$result._id',
								label: '$result.label',
								rgb: '$result.rgb',
							},
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					group: {
						$filter: {
							input: '$group',
							as: 'item',
							cond: { $ne: ['$$item.instance_id', instance_id] },
						},
					},
				},
			},
		]);
	}
}
