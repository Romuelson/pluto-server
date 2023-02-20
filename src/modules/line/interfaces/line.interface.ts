import mongoose from 'mongoose';

export interface ILine {
	name: string;
}

export interface ILineProduct extends ILine {
	line_id: mongoose.Schema.Types.ObjectId;
}
