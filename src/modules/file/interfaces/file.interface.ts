import { TObjectMap } from 'src/types/main.type';

export interface ICreateFileResponse {
	url: string;
	name: string;
}

export type TFileMulter = Express.Multer.File;
export type TFileFields<T extends string | number | symbol, K = TFileMulter[]> = TObjectMap<T, K>;
