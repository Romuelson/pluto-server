import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
	Get,
	Put,
	Post,
	Body,
	Param,
	Delete,
	Controller,
	HttpStatus,
} from '@nestjs/common';

import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';

import { EOpenApiSummary } from '../../common/openapi/openapi.enum';
import { CreateProductDTO, UpdateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Product })
	@Post()
	async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
		return await this.productService.create(createProductDTO);
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

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Product })
	@Put(':id')
	async update(
		@Body() updateProductDTO: UpdateProductDTO,
		@Param('id') id: string,
	): Promise<Product> {
		return await this.productService.update(id, updateProductDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Product })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.productService.delete(id);
	}
}
