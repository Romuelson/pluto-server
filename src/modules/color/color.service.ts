import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateColorDTO } from './dto/create-color.dto';
import { UpdateColorDTO } from './dto/update-color.dto';

import { Color, ColorDocument } from './schemas/color.schema';

@Injectable()
export class ColorService {
	constructor(@InjectModel(Color.name) private colorModel: Model<ColorDocument>) {}

	async create(createColorDTO: CreateColorDTO): Promise<Color> {
		const res = await new this.colorModel(createColorDTO).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async findAll(): Promise<Color[]> {
		const res = await this.colorModel.find().exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findById(id: string): Promise<Color> {
		const res = await this.colorModel.findById(id).exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async update(id: string, categoryColorDTO: UpdateColorDTO): Promise<Color> {
		const res = await this.colorModel
			.findByIdAndUpdate(id, categoryColorDTO, { new: true })
			.exec();

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async delete(id: string) {
		const res = await this.colorModel.findByIdAndRemove(id, { state: false }).exec();

		if (!res) throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.colorModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
