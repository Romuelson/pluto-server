import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { ILineProduct } from './interfaces/line.interface';
import { Line, LineDocument } from './schemas/line.schema';

import { CreateLineDTO } from './dto/create-line.dto';
import { UpdateLineDTO } from './dto/update-line.dto';

@Injectable()
export class LineService {
	constructor(
		@InjectModel(Line.name)
		private lineModel: Model<LineDocument>,
	) {}

	async create(createLineDTO: CreateLineDTO): Promise<Line> {
		const line = new this.lineModel(createLineDTO).save();

		if (!line) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return line;
	}

	async findAll(): Promise<Line[]> {
		const lines = this.lineModel.find().exec();

		if (!lines) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return lines;
	}

	async findById(id: string): Promise<Line> {
		const line = await this.lineModel.findById(id);

		if (!line) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return line;
	}

	async update(id: string, categoryLineDTO: UpdateLineDTO): Promise<Line> {
		const line = await this.lineModel.findByIdAndUpdate(id, categoryLineDTO, { new: true });

		if (!line) {
			throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);
		}

		return line;
	}

	async delete(id: string) {
		const line = this.lineModel.findByIdAndRemove(id, {
			state: false,
		});

		if (!line) {
			throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);
		}

		return line;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.lineModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}

	// async syncLine(id: string): Promise<{ line: ILineProduct }> {
	// 	try {
	// 		const { _id, name } = await this.findById(id);

	// 		return {
	// 			line: {
	// 				line_id: _id,
	// 				name: name,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
	// 	}
	// }
}
