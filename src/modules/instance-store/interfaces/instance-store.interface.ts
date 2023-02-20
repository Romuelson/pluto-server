import { Types } from 'mongoose';

export interface IInstanceStore {
	instance_id: Types.ObjectId;
	price: number;
	amount: number;
	reserve: number;
	discount: number;
}

export type TCreateInstanceStoreDTO = Omit<IInstanceStore, 'instance_id'>;

export type TInstanceStoreCreateProps = Pick<IInstanceStore, 'instance_id'> & {
	instanceStoreDTO: TCreateInstanceStoreDTO;
};
