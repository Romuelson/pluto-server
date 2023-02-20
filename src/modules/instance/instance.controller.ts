import { Controller } from '@nestjs/common';

@Controller('instance')
export class InstanceController {
	// constructor(private readonly instanceService: InstanceService) {}
	// @ApiOperation({ summary: EOpenApiSummary.create })
	// @ApiResponse({ status: HttpStatus.CREATED, type: Instance })
	// @UsePipes(new ValidationPipe({ transform: true }))
	// @Post()
	// async create(@Body() DTO: CreateInstanceDTO) {
	// 	return await this.instanceService.create(DTO);
	// }
}
