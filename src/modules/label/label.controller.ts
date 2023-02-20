import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { CreateLabelDTO } from './dto/create-label.dto';
import { UpdateLabelDTO } from './dto/update-label.dto';

import { Label } from './schemas/label.schema';
import { LabelService } from './label.service';

@Controller('label')
export class LabelController {
	constructor(private readonly labelService: LabelService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Label })
	@Post()
	async create(@Body() createLabelDTO: CreateLabelDTO): Promise<Label> {
		return await this.labelService.create(createLabelDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Label] })
	@Get()
	async findAll(): Promise<Label[]> {
		return await this.labelService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Label })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Label> {
		return await this.labelService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Label })
	@Put(':id')
	async update(@Body() updateLabelDTO: UpdateLabelDTO, @Param('id') id: string): Promise<Label> {
		return await this.labelService.update(id, updateLabelDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Label })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.labelService.delete(id);
	}
}
