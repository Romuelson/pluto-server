import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateChapterDTO } from './dto/create-chapter.dto';
import { UpdateChapterDTO } from './dto/update-chapter.dto';

@Injectable()
export class ChapterService {
	constructor(
		@InjectModel(Chapter.name)
		private chapterModel: Model<ChapterDocument>,
	) {}

	async create(createChapterDTO: CreateChapterDTO): Promise<Chapter> {
		const chapter = new this.chapterModel(createChapterDTO).save();

		if (!chapter) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return chapter;
	}

	async findAll(): Promise<Chapter[]> {
		const chapters = this.chapterModel.find().exec();

		if (!chapters) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return chapters;
	}

	async findById(id: string): Promise<ChapterDocument> {
		const chapter = await this.chapterModel.findById(id);

		if (!chapter) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return chapter;
	}

	async update(id: string, updateChapterDTO: UpdateChapterDTO): Promise<Chapter> {
		const chapter = await this.chapterModel.findByIdAndUpdate(id, updateChapterDTO, {
			new: true,
		});

		if (!chapter) {
			throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);
		}

		return chapter;
	}

	async delete(id: string) {
		const chapter = this.chapterModel.findByIdAndRemove(id, {
			state: false,
		});

		if (!chapter) {
			throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);
		}

		return chapter;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.chapterModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
