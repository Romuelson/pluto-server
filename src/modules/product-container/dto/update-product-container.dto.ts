import { PartialType } from '@nestjs/swagger';
import { ProductContainer } from '../schemas/product-container.schema';

export class UpdateProductContainerDTO extends PartialType(ProductContainer) {}
