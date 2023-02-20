import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { CompoundService } from './compound.service';
import { Compound } from './schemas/compound.schema';

import { UpdateCompoundDTO } from './dto/update-compound.dto';

@Controller('compound')
export class CompoundController {
	constructor(private readonly compoundService: CompoundService) {}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Compound] })
	@Get()
	async findAll(): Promise<Compound[]> {
		return await this.compoundService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Compound })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Compound> {
		return await this.compoundService.findById(id);
	}

	// @ApiOperation({ summary: EOpenApiSummary.update })
	// @ApiResponse({ status: HttpStatus.OK, type: Compound })
	// @Put(':id')
	// async update(
	// 	@Body() updateCompoundDTO: UpdateCompoundDTO,
	// 	@Param('id') id: string,
	// ): Promise<Compound> {
	// 	return await this.compoundService.update(id, updateCompoundDTO);
	// }

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Compound })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.compoundService.delete(id);
	}
}
