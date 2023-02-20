import { Types } from 'mongoose';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { ProductContainer } from './schemas/product-container.schema';
import { ProductContainerService } from './product-container.service';
import { CreateProductContainerDTO } from './dto/create-product-container.dto';

@Controller('product-container')
export class ProductContainerController {
	constructor(private readonly productContainerService: ProductContainerService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: ProductContainer })
	@Post()
	async aggregateGroup(@Body() DTO: CreateProductContainerDTO) {
		const product_id = new Types.ObjectId(DTO.product_id);
		return await this.productContainerService.aggregateGroup(product_id);
	}
}
