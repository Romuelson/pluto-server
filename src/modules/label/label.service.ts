import mongoose, { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateLabelDTO } from './dto/create-label.dto';
import { UpdateLabelDTO } from './dto/update-label.dto';

import { Label, LabelDocument } from './schemas/label.schema';

@Injectable()
export class LabelService {
	constructor(
		@InjectModel(Label.name)
		private labelModel: Model<LabelDocument>,
	) {}

	async create(createLabelDTO: CreateLabelDTO): Promise<Label> {
		const label = new this.labelModel(createLabelDTO).save();

		if (!label) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return label;
	}

	async findAll(): Promise<Label[]> {
		const labels = this.labelModel.find().exec();

		if (!labels) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return labels;
	}

	async findById(id: string): Promise<Label> {
		const label = await this.labelModel.findById(id);

		if (!label) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return label;
	}

	async update(id: string, categoryLabelDTO: UpdateLabelDTO): Promise<Label> {
		const label = await this.labelModel.findByIdAndUpdate(id, categoryLabelDTO, { new: true });

		if (!label) {
			throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);
		}

		return label;
	}

	async delete(id: string) {
		const label = this.labelModel.findByIdAndRemove(id, {
			state: false,
		});

		if (!label) {
			throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);
		}

		return label;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.labelModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}

	async syncObjectIds(ids: mongoose.Types.ObjectId[]): Promise<Label[]> {
		const labels = await this.labelModel.find({ _id: { $in: ids } });

		if (labels.length !== ids.length) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return labels;
	}

	// async syncLabel(ids: string[]): Promise<TSyncLabel> {
	// 	const createObjectId = (id: string) => new mongoose.Types.ObjectId(id);
	// 	const labels = ids.map((item) => createObjectId(item));

	// 	try {
	// 		const syncLabels = await this.syncObjectIds(labels);

	// 		return {
	// 			labels: syncLabels.map(({ _id, name }) => ({
	// 				label_id: _id,
	// 				name,
	// 			})),
	// 		};
	// 	} catch (error) {
	// 		throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
	// 	}
	// }
}
