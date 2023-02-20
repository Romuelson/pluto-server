import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { CreateSizeDTO } from './dto/create-size.dto';
import { UpdateSizeDTO } from './dto/update-size.dto';

import { Size } from './schemas/size.schema';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
	constructor(private readonly sizeService: SizeService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Size })
	@Post()
	async create(@Body() createSizeDTO: CreateSizeDTO): Promise<Size> {
		return await this.sizeService.create(createSizeDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Size] })
	@Get()
	async findAll(): Promise<Size[]> {
		return await this.sizeService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Size })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Size> {
		return await this.sizeService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Size })
	@Put(':id')
	async update(@Body() updateSizeDTO: UpdateSizeDTO, @Param('id') id: string): Promise<Size> {
		return await this.sizeService.update(id, updateSizeDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Size })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.sizeService.delete(id);
	}
}
