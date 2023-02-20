import { Model, Types } from 'mongoose';

import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import {
	IProduct,
	TProductCreateProps,
	TProductUpdateProps,
	TProductCreateInstance,
	TProductSyncContainerProps,
} from './interfaces/product.interface';

import { Product, ProductDocument } from './schemas/product.schema';
import { ProductContainer } from '../product-container/schemas/product-container.schema';

import { GroupDTO, ProductContainerDTO } from './models/container.model';

import { InstanceService } from '../instance/instance.service';
import { CompoundService } from '../compound/compound.service';
import { ProductViewService } from '../product-view/product-view.service';
import { ProductContainerService } from '../product-container/product-container.service';

@Injectable()
export class ProductService implements OnModuleInit {
	private compoundService: CompoundService;

	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
		private moduleRef: ModuleRef,
		private readonly productViewService: ProductViewService,
		private readonly instanceService: InstanceService,
		private readonly productContainerService: ProductContainerService,
	) {}

	async onModuleInit() {
		this.compoundService = this.moduleRef.get(CompoundService, { strict: false });
	}

	async create({ createProductDTO, fileFields }: TProductCreateProps) {
		const { productViewDTO, instanceDTO } = createProductDTO;

		const product = await this.init();
		const product_id = product._id;

		const productView = await this.productViewService.create({ productViewDTO, product_id });

		const instance = await this.createInstance({
			productInstanceProps: { instanceDTO, product_id },
			fileFields,
		});

		return await this.syncContainer({
			product_id,
			containerProps: { viewDefault: productView._id, viewInstance: instance._id },
		});
	}

	async createInstance({ productInstanceProps, fileFields }: TProductCreateInstance) {
		const { instanceDTO, product_id } = productInstanceProps;

		return await this.instanceService.create({ instanceDTO, fileFields, product_id });
	}

	async syncContainer(props: TProductSyncContainerProps) {
		const { product_id, containerProps } = props;

		const groupDocuments = await this.productContainerService.aggregateGroup(product_id);
		const group = groupDocuments.map((item) => new GroupDTO(item));

		const containerDocument = containerProps
			? await this.productContainerService.create({ ...containerProps, product_id })
			: await this.productContainerService.update({
					updateProductContainerDTO: { group },
					product_id,
			  });

		const container = new ProductContainerDTO(containerDocument.toObject<ProductContainer>());

		return await this.update({ updateProductDTO: { container }, product_id });
	}

	async init() {
		const res = await new this.productModel({ container: null } as IProduct).save();

		if (!res) throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		return res;
	}

	async update(props: TProductUpdateProps) {
		const { updateProductDTO, product_id } = props;

		const res = await this.productModel.findByIdAndUpdate(product_id, updateProductDTO, {
			new: true,
		});

		if (!res) throw new HttpException(EHttpException.update, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async findAll(): Promise<Product[]> {
		const res = this.productModel.find().exec();

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findById(id: string): Promise<Product> {
		const res = await this.productModel.findById(id);

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async findBySeriesId(id: string): Promise<Product> {
		const res = await this.productModel.findOne({ series_id: id });

		if (!res) throw new HttpException(EHttpException.find, HttpStatus.NO_CONTENT);

		return res;
	}

	async delete(id: string) {
		const res = this.productModel.findByIdAndRemove(id);

		if (!res) throw new HttpException(EHttpException.delete, HttpStatus.NOT_MODIFIED);

		return res;
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.productModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
