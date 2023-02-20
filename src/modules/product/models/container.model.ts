import { IProductContainer } from 'src/modules/product-container/interfaces/product-container.interface';
import { IInstance } from 'src/modules/instance/interfaces/instance.interface';
import { IInstanceContent } from 'src/modules/instance-content/interfaces/instance-content.interface';

import { ProductView } from 'src/modules/product-view/schemas/product-view.schema';
import { ProductContainer } from 'src/modules/product-container/schemas/product-container.schema';

import { Instance } from 'src/modules/instance/schemas/instance.schema';
import { InstanceContent } from 'src/modules/instance-content/schemas/instance-content.schema';
import { InstanceStore } from 'src/modules/instance-store/schemas/instance-store.schema';

import { InstanceImage } from 'src/modules/instance-image/schemas/instance-image.schema';

import { Color } from 'src/modules/color/schemas/color.schema';
import { Size } from 'src/modules/size/schemas/size.schema';

import { Chapter } from 'src/modules/chapter/schemas/chapter.schema';
import { Material } from 'src/modules/material/schemas/material.schema';
import { Brand } from 'src/modules/brand/schemas/brand.schema';
import { Line } from 'src/modules/line/schemas/line.schema';
import { Label } from 'src/modules/label/schemas/label.schema';
import { Group, GroupSize } from 'src/modules/product-container/models/group.model';
import { Types } from 'mongoose';

type OmitProductContainer<G, I> = Omit<IProductContainer<G, I>, 'product_id'>;
type OmitProductContainerDTO = OmitProductContainer<OmitViewDefault, OmitViewInstanceDTO>;

type OmitViewDefault = Omit<ProductView, 'product_id'>;

type OmitInstance<C, S> = Omit<IInstance<C, S>, 'product_id'>;
type OmitInstanceStore = Omit<InstanceStore, 'instance_id'>;
type OmitViewInstanceDTO = OmitInstance<OmitInstanceContentDTO, OmitInstanceStore>;

type OmitInstanceContent<I> = Omit<IInstanceContent<I>, 'product_id'>;
type OmitInstanceImage = Omit<InstanceImage, 'instance_id'>;
type OmitInstanceContentDTO = OmitInstanceContent<OmitInstanceImage>;

export class ProductContainerDTO implements OmitProductContainerDTO {
	public viewDefault: ViewDefaultDTO;
	public viewInstance: ViewInstanceDTO;
	public group: Group[];

	constructor(model: ProductContainer) {
		this.viewDefault = new ViewDefaultDTO(model.viewDefault);
		this.viewInstance = new ViewInstanceDTO(model.viewInstance);
		this.group = model.group;
	}
}

class ViewDefaultDTO implements OmitViewDefault {
	public title: string;
	public description: string;
	public chapter: Chapter;
	public materials: Material[];
	public brand: Brand;
	public line: Line;
	public labels: Label[];

	constructor({ chapter, ...otherProps }: ProductView) {
		this.title = otherProps.title;
		this.description = otherProps.description;

		this.chapter = {
			name: chapter.name,

			category: {
				name: chapter.category.name,
				state: chapter.category.state,
				createdAt: chapter.category.createdAt,
			},

			state: chapter.state,
			createdAt: chapter.createdAt,
		};

		this.materials = otherProps.materials.map((item) => ({ name: item.name } as Material));
		this.brand = { name: otherProps.brand.name };
		this.line = { name: otherProps.line.name };
		this.labels = otherProps.labels.map((item) => ({ name: item.name } as Label));
	}
}

class ViewInstanceDTO implements OmitViewInstanceDTO {
	public content: InstanceContentDTO;
	public store: InstanceStoreDTO;

	constructor({ content, store }: Instance) {
		this.content = new InstanceContentDTO(content!);
		this.store = new InstanceStoreDTO(store!);
	}
}

class GroupSizeDTO implements GroupSize {
	public instance_id: Types.ObjectId;
	public size: Size;

	constructor({ instance_id, size }: GroupSize) {
		this.instance_id = instance_id;
		this.size = { extent: size.extent };
	}
}

export class GroupDTO implements Group {
	public color: Color;
	public sizes: GroupSize[];

	constructor({ color, sizes }: Group) {
		this.color = { label: color.label, rgb: color.rgb };
		this.sizes = sizes.map((item) => new GroupSizeDTO(item));
	}
}

class InstanceContentDTO implements OmitInstanceContentDTO {
	public size: Size;
	public color: Color;
	public image: OmitInstanceImage;

	constructor({ size, color, image }: InstanceContent) {
		this.size = { extent: size.extent };
		this.color = { label: color.label, rgb: color.rgb };

		this.image = {
			filename: image.filename,
			mediaTypes: image.mediaTypes,
			extencionTypes: image.extencionTypes,
		};
	}
}

class InstanceStoreDTO implements OmitInstanceStore {
	public price: number;
	public amount: number;
	public discount: number;
	public reserve: number;

	constructor({ price, amount, discount, reserve }: InstanceStore) {
		this.price = price;
		this.amount = amount;
		this.discount = discount;
		this.reserve = reserve;
	}
}
