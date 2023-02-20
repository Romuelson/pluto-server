import { Controller } from '@nestjs/common';

@Controller('product-view')
export class ProductViewController {
	// constructor(private readonly productViewService: ProductViewService) {}
	// @ApiOperation({ summary: EOpenApiSummary.create })
	// @ApiResponse({ status: HttpStatus.CREATED, type: ProductView })
	// @UsePipes(new ValidationPipe({ transform: true }))
	// @Post()
	// async create(@Body() DTO: CreateProductViewDTO) {
	// 	return await this.productViewService.create(DTO);
	// }
}
