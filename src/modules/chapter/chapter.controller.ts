import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';

import { EOpenApiSummary } from 'src/common/openapi/openapi.enum';

import { Chapter } from './schemas/chapter.schema';
import { ChapterService } from './chapter.service';

import { CreateChapterDTO } from './dto/create-chapter.dto';
import { UpdateChapterDTO } from './dto/update-chapter.dto';

@Controller('chapter')
export class ChapterController {
	constructor(private readonly chapterService: ChapterService) {}

	@ApiOperation({ summary: EOpenApiSummary.create })
	@ApiResponse({ status: HttpStatus.CREATED, type: Chapter })
	@Post()
	async create(@Body() createChapterDTO: CreateChapterDTO): Promise<Chapter> {
		return await this.chapterService.create(createChapterDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.findAll })
	@ApiResponse({ status: HttpStatus.OK, type: [Chapter] })
	@Get()
	async findAll(): Promise<Chapter[]> {
		return await this.chapterService.findAll();
	}

	@ApiOperation({ summary: EOpenApiSummary.findById })
	@ApiResponse({ status: HttpStatus.OK, type: Chapter })
	@Get(':id')
	async findById(@Param('id') id: string): Promise<Chapter> {
		return await this.chapterService.findById(id);
	}

	@ApiOperation({ summary: EOpenApiSummary.update })
	@ApiResponse({ status: HttpStatus.OK, type: Chapter })
	@Put(':id')
	async update(
		@Body() updateChapterDTO: UpdateChapterDTO,
		@Param('id') id: string,
	): Promise<Chapter> {
		return await this.chapterService.update(id, updateChapterDTO);
	}

	@ApiOperation({ summary: EOpenApiSummary.delete })
	@ApiResponse({ status: HttpStatus.OK, type: Chapter })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.chapterService.delete(id);
	}
}
