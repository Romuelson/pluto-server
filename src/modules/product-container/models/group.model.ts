import { Types } from 'mongoose';

import { Color } from 'src/modules/color/schemas/color.schema';
import { Size } from 'src/modules/size/schemas/size.schema';

export class GroupSize {
	public instance_id: Types.ObjectId;
	public size: Size;
}

export class Group {
	public color: Color;
	public sizes: GroupSize[];
}
