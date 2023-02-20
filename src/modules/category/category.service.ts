import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Category, CategoryDocument } from './schemas/category.schema';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name)
		private categoryModel: Model<CategoryDocument>,
	) {}

	async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
		const category = new this.categoryModel(createCategoryDTO).save();

		if (!category) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}

		return category;
	}

	async findAll(): Promise<Category[]> {
		const categories = this.categoryModel.find().exec();

		if (!categories) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return categories;
	}

	async findById(id: string): Promise<Category> {
		const category = await this.categoryModel.findById(id);

		if (!category) {
			throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
		}

		return category;
	}

	async update(id: string, categoryProductDTO: UpdateCategoryDTO): Promise<Category> {
		const category = await this.categoryModel.findByIdAndUpdate(id, categoryProductDTO, {
			new: true,
		});

		if (!category) {
			throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);
		}

		return category;
	}

	async delete(id: string) {
		const category = this.categoryModel.findByIdAndRemove(id, {
			state: false,
		});

		if (!category) {
			throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);
		}

		return category;
	}
}
