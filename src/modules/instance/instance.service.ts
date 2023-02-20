import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TConfigService } from 'src/config/interfaces/config.interface';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import {
	IInstance,
	TInstanceCreateProps,
	TInstanceUpdateProps,
} from './interfaces/instance.interface';

import { Instance, InstanceDocument } from './schemas/instance.schema';

import { InstanceImageService } from '../instance-image/instance-image.service';
import { InstanceContentService } from '../instance-content/instance-content.service';
import { InstanceStoreService } from '../instance-store/instance-store.service';

@Injectable()
export class InstanceService {
	constructor(
		@InjectModel(Instance.name) private instanceModel: Model<InstanceDocument>,
		private readonly configService: ConfigService<TConfigService>,

		private readonly instanceImageService: InstanceImageService,
		private readonly instanceContentService: InstanceContentService,
		private readonly instanceStoreService: InstanceStoreService,
	) {}

	async create(props: TInstanceCreateProps) {
		const { instanceDTO, fileFields, product_id } = props;
		const { instanceContentDTO, instanceStoreDTO } = instanceDTO;

		const instance = await this.init(product_id);
		const instance_id = instance._id!;

		const instanceImage = await this.instanceImageService.create({
			fileFields,
			instance_id,
		});

		const instanceContent = await this.instanceContentService.create({
			instanceContentDTO,
			image: instanceImage._id!,
			product_id,
		});

		const instanceStore = await this.instanceStoreService.create({
			instanceStoreDTO,
			instance_id,
		});

		return await this.update({
			instanceDTO: { content: instanceContent, store: instanceStore },
			instance_id,
		});
	}

	async init(product_id: Types.ObjectId) {
		const createModel: IInstance = {
			product_id,
			content: null,
			store: null,
		};

		const res = await new this.instanceModel(createModel).save();

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async update(props: TInstanceUpdateProps) {
		const { instanceDTO, instance_id } = props;

		const res = await this.instanceModel.findByIdAndUpdate(instance_id, instanceDTO, {
			new: true,
		});

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async findById(id: string): Promise<InstanceDocument> {
		const res = await this.instanceModel.findById(id).exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async insertMany(instances: IInstance[]): Promise<Instance[]> {
		const res = await this.instanceModel.insertMany(instances);

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.instanceModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
