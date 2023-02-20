import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { Line } from './schemas/line.schema';
import { LineService } from './line.service';

import { CreateLineDTO } from './dto/create-line.dto';
import { UpdateLineDTO } from './dto/update-line.dto';

@Controller('line')
export class LineController {
	constructor(private readonly lineService: LineService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Line })
	@Post()
	async create(@Body() createCollectionDTO: CreateLineDTO): Promise<Line> {
		return await this.lineService.create(createCollectionDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Line] })
	@Get()
	async findAll(): Promise<Line[]> {
		return await this.lineService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Line })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Line> {
		return await this.lineService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Line })
	@Put(':id')
	async update(
		@Body() updateLineDTO: UpdateLineDTO,
		@Param('id') id: string,
	): Promise<Line> {
		return await this.lineService.update(id, updateLineDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Line })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.lineService.delete(id);
	}
}
