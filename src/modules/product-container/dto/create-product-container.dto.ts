import { ApiProperty } from '@nestjs/swagger';

export class CreateProductContainerDTO {
	@ApiProperty({ example: '63add4b61f25065214542e65' })
	readonly product_id: string;
}
