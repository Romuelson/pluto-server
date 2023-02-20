import mongoose, { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';
import { Size, SizeDocument } from './schemas/size.schema';

import { CreateSizeDTO } from './dto/create-size.dto';
import { UpdateSizeDTO } from './dto/update-size.dto';

@Injectable()
export class SizeService {
	constructor(@InjectModel(Size.name) private sizeModel: Model<SizeDocument>) {}

	async create(createSizeDTO: CreateSizeDTO): Promise<Size> {
		const res = await new this.sizeModel(createSizeDTO).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async findAll(): Promise<Size[]> {
		const res = await this.sizeModel.find().exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findById(id: string): Promise<Size> {
		const res = await this.sizeModel.findById(id).exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findByIds(ids: mongoose.Types.ObjectId[]): Promise<Size[]> {
		const res: Size[] = await this.sizeModel.find({ _id: { $in: ids } });

		if (res.length !== ids.length)
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async update(id: string, categorySizeDTO: UpdateSizeDTO): Promise<Size> {
		const res = await this.sizeModel
			.findByIdAndUpdate(id, categorySizeDTO, { new: true })
			.exec();

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async delete(id: string) {
		const res = await this.sizeModel.findByIdAndRemove(id, { state: false }).exec();

		if (!res) throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.sizeModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
