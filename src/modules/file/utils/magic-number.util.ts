import filetype from 'magic-bytes.js';
import { readFileSync } from 'fs-extra';

import { EMimeType } from '../enum/image.enum';
import { TFileFields } from '../interfaces/file.interface';

export function magicNumber(fileFields: TFileFields<string>) {
	const values = Object.values(EMimeType);
	const entries = Object.entries(fileFields);

	const isMime = (filePath: string) => {
		const buffer = filetype(readFileSync(filePath))[0];
		if (!buffer) return false;

		return values.includes(buffer.mime as EMimeType);
	};

	let flag = true;
	for (let i = 0; flag && i < entries.length; i++) {
		const res = entries[i][1].every(({ path }) => isMime(path));
		if (!res) flag = false;
	}

	return flag;
}
