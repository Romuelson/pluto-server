import { EExtensionType } from '../enum/image.enum';

export class MFile {
	buffer: Buffer;
	fieldname: string;
	filename: string;

	name?: string;
	originalname: string;

	extension: EExtensionType;
	mediaType: string;

	path: string;
	downloadUrl?: string;

	constructor(file: MFile) {
		this.buffer = file.buffer;
		this.fieldname = file.fieldname;
		this.filename = file.filename;

		this.name = file.name;
		this.originalname = file.originalname;

		this.extension = file.extension;
		this.mediaType = file.mediaType;

		this.path = file.path;
		this.downloadUrl = file.downloadUrl;
	}
}
