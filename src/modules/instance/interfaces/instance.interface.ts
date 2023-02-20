import { Types } from 'mongoose';

import { TFileFields } from 'src/modules/file/interfaces/file.interface';
import { IInstanceImageFiles } from 'src/modules/instance-image/interfaces/instance-image.interface';

import { CreateInstanceContentDTO } from 'src/modules/instance-content/dto/create-instance-content.dto';
import { CreateInstanceStoreDTO } from 'src/modules/instance-store/dto/create-instance-store.dto';

import { UpdateInstanceDTO } from '../dto/update-instance.dto';

import { InstanceContent } from 'src/modules/instance-content/schemas/instance-content.schema';
import { InstanceStore } from 'src/modules/instance-store/schemas/instance-store.schema';

export interface IInstance<C = InstanceContent | null, S = InstanceStore | null> {
	product_id: Types.ObjectId;
	content: C;
	store: S;
	// availability: boolean;
}

export type TCreateInstanceDTO = {
	instanceContentDTO: CreateInstanceContentDTO;
	instanceStoreDTO: CreateInstanceStoreDTO;
};

export type TInstanceCreateProps = Pick<IInstance, 'product_id'> & {
	instanceDTO: TCreateInstanceDTO;
	fileFields: TFileFields<keyof IInstanceImageFiles>;
};

export type TInstanceUpdateProps = {
	instanceDTO: UpdateInstanceDTO;
	instance_id: Types.ObjectId;
};
