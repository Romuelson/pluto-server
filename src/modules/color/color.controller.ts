import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';
import { ColorService } from './color.service';

import { CreateColorDTO } from './dto/create-color.dto';
import { UpdateColorDTO } from './dto/update-color.dto';

import { Color } from './schemas/color.schema';

@Controller('color')
export class ColorController {
	constructor(private readonly colorService: ColorService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Color })
	@Post()
	async create(@Body() createColorDTO: CreateColorDTO): Promise<Color> {
		return await this.colorService.create(createColorDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Color] })
	@Get()
	async findAll(): Promise<Color[]> {
		return await this.colorService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Color })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Color> {
		return await this.colorService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Color })
	@Put(':id')
	async update(@Body() updateColorDTO: UpdateColorDTO, @Param('id') id: string): Promise<Color> {
		return await this.colorService.update(id, updateColorDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Color })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.colorService.delete(id);
	}
}
