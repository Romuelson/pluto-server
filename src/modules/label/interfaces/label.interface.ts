import mongoose from 'mongoose';

export interface ILabel {
	name: string;
}

export interface ILabelProduct extends ILabel {
	label_id: mongoose.Schema.Types.ObjectId;
}

export type TSyncLabel = {
	labels: ILabelProduct[];
};
