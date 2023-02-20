import mongoose from 'mongoose';

import { CreateCompoundDTO } from '../dto/create-compound.dto';
import { Material } from 'src/modules/material/schemas/material.schema';

export interface ICompound {
	series_id: string;
	material_id: Material;
	amount: number;
}

export type ICreateCompoundDTO = Omit<ICompound, 'series_id'>;

/* create */
export type TCompoundCreateProps = {
	createCompoundDTO: CreateCompoundDTO[];
	series_id: string;
};

/* compoundWithProduct */
export type CompoundWithProductProps = {
	series_id: string;
};

export type CompoundWithProductResult = {
	compound_id: mongoose.Schema.Types.ObjectId;
	material: string;
	amount: number;
};

export type CompoundWithProductList = CompoundWithProductResult[];
