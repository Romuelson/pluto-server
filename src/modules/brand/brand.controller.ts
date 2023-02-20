import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { CreateBrandDTO } from './dto/create-brand.dto';
import { UpdateBrandDTO } from './dto/update-product.dto';

import { Brand } from './schemas/brand.schema';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Brand })
	@Post()
	async create(@Body() createBrandDTO: CreateBrandDTO): Promise<Brand> {
		return await this.brandService.create(createBrandDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Brand] })
	@Get()
	async findAll(): Promise<Brand[]> {
		return await this.brandService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Brand })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Brand> {
		return await this.brandService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Brand })
	@Put(':id')
	async update(@Body() updateBrandDTO: UpdateBrandDTO, @Param('id') id: string): Promise<Brand> {
		return await this.brandService.update(id, updateBrandDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Brand })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.brandService.delete(id);
	}
}
