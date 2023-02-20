import { SetMetadata } from '@nestjs/common';

export const ExcludeFields = (...fields: string[]) => SetMetadata('excludeFields', fields);
