import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Material, MaterialDocument } from './schemas/material.schema';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
	constructor(
		@InjectModel(Material.name)
		private materialModel: Model<MaterialDocument>,
	) {}

	async create(createMaterialDTO: CreateMaterialDTO): Promise<Material> {
		const res = new this.materialModel(createMaterialDTO).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async findAll(): Promise<Material[]> {
		const res = this.materialModel.find().exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findById(id: string): Promise<Material> {
		const res = await this.materialModel.findById(id);

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async update(id: string, updateMaterialDTO: UpdateMaterialDTO): Promise<Material> {
		const res = await this.materialModel.findByIdAndUpdate(id, updateMaterialDTO, {
			new: true,
		});

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async delete(id: string) {
		const res = this.materialModel.findByIdAndRemove(id);

		if (!res) throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.materialModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}

	// async syncObjectIds(ids: mongoose.Types.ObjectId[]) {
	// 	const materials = await this.materialModel.find({ _id: { $in: ids } });

	// 	if (materials.length !== ids.length)
	// 		throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

	// 	return new Map(materials.map(({ _id, name }) => [String(_id), name]));
	// }

	// async syncCompound(compound: CreateCompoundDTO[]): Promise<TSyncCompound> {
	// 	const createObjectId = (id: string) => new mongoose.Types.ObjectId(id);

	// 	const materials = compound.map((item) => createObjectId(item.material_id));

	// 	try {
	// 		const syncMaterials = await this.syncObjectIds(materials);

	// 		return {
	// 			compound: compound.map((item) => ({
	// 				...item,
	// 				name: syncMaterials.get(item.material_id)!,
	// 			})),
	// 		};
	// 	} catch (error) {
	// 		throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);
	// 	}
	// }
}
