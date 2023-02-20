import { PartialType } from '@nestjs/swagger';
import { Product } from '../schemas/product.schema';

export class UpdateProductDTO extends PartialType(Product) {}
