import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { Material } from './schemas/material.schema';
import { MaterialService } from './material.service';

import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
	constructor(private readonly materialService: MaterialService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Material })
	@Post()
	async create(@Body() createMaterialDTO: CreateMaterialDTO): Promise<Material> {
		return await this.materialService.create(createMaterialDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Material] })
	@Get()
	async findAll(): Promise<Material[]> {
		return await this.materialService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Material })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Material> {
		return await this.materialService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Material })
	@Put(':id')
	async update(
		@Body() updateMaterialDTO: UpdateMaterialDTO,
		@Param('id') id: string,
	): Promise<Material> {
		return await this.materialService.update(id, updateMaterialDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Material })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.materialService.delete(id);
	}
}
