import mongoose from 'mongoose';

export interface IBrand {
	name: string;
}

export interface IBrandProduct extends IBrand {
	brand_id: mongoose.Schema.Types.ObjectId;
}
