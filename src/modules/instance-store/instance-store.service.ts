import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { InstanceStore, InstanceStoreDocument } from './schemas/instance-store.schema';
import { TInstanceStoreCreateProps } from './interfaces/instance-store.interface';

@Injectable()
export class InstanceStoreService {
	constructor(
		@InjectModel(InstanceStore.name)
		private instanceStoreModel: Model<InstanceStoreDocument>,
	) {}

	async create(props: TInstanceStoreCreateProps): Promise<InstanceStoreDocument> {
		const { instanceStoreDTO, instance_id } = props;

		const res = await new this.instanceStoreModel({ ...instanceStoreDTO, instance_id }).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}
}
