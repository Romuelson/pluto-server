// import { Controller } from '@nestjs/common';

// @Controller('category')
// export class CategoryController {}

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

import { EOpenApiSummary } from '../../common/openapi/openapi.enum';

import * as DTO from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Category })
	@Post()
	async create(
		@Body() createCategoryDTO: DTO.CreateCategoryDTO,
	): Promise<Category> {
		return await this.categoryService.create(createCategoryDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Category] })
	@Get()
	async findAll(): Promise<Category[]> {
		return await this.categoryService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Category })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Category })
	@Put(':id')
	async update(
		@Body() updateCategoryDTO: DTO.UpdateCategoryDTO,
		@Param('id') id: string,
	): Promise<Category> {
		return await this.categoryService.update(id, updateCategoryDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Category })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.categoryService.delete(id);
	}
}
