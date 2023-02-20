import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	Controller,
	HttpStatus,
	UploadedFiles,
	ValidationPipe,
	UseInterceptors,
} from '@nestjs/common';

import { EOpenApiSummary } from '../../common/openapi/openapi.enum';

import { TFileFields } from '../file/interfaces/file.interface';
import { IInstanceImageFiles } from '../instance-image/interfaces/instance-image.interface';

import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';

import { CreateProductDTO } from './dto/create-product.dto';
import { CreateProductInstanceDTO } from './dto/create-product-instance.dto';
import { Types } from 'mongoose';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Product })
	@Post('create')
	@ApiConsumes('multipart/form-data')
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'frontside', maxCount: 1 },
			{ name: 'backside', maxCount: 1 },

			{ name: 'overallFrontside', maxCount: 1 },
			{ name: 'overallBackside', maxCount: 1 },

			{ name: 'productFrontside', maxCount: 1 },
			{ name: 'productBackside', maxCount: 1 },
		]),
	)
	async create(
		@Body() createProductDTO: CreateProductDTO,
		@UploadedFiles() fileFields: TFileFields<keyof IInstanceImageFiles>,
	) {
		return await this.productService.create({ createProductDTO, fileFields });
	}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Product })
	@Post('instance')
	@ApiConsumes('multipart/form-data')
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'frontside', maxCount: 1 },
			{ name: 'backside', maxCount: 1 },

			{ name: 'overallFrontside', maxCount: 1 },
			{ name: 'overallBackside', maxCount: 1 },

			{ name: 'productFrontside', maxCount: 1 },
			{ name: 'productBackside', maxCount: 1 },
		]),
	)
	async createInstance(
		@Body() DTO: CreateProductInstanceDTO,
		@UploadedFiles() fileFields: TFileFields<keyof IInstanceImageFiles>,
	) {
		const product_id = new Types.ObjectId(DTO.product_id);

		const res = await this.productService.createInstance({
			productInstanceProps: { ...DTO, product_id },
			fileFields,
		});

		await this.productService.syncContainer({ product_id });

		return res;
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Product] })
	@Get()
	async findAll(): Promise<Product[]> {
		return await this.productService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Product })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Product> {
		return await this.productService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Product })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.productService.delete(id);
	}
}
