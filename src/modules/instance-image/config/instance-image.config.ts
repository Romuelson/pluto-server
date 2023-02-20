import { EMediaType } from 'src/modules/file/enum/image.enum';
import { TImageConfig } from '../interfaces/instance-image.interface';

/* BD */

export const InstanceImageConfig = (): TImageConfig => ({
	options: {
		[EMediaType.MOBILE]: {
			convert: {
				png: { quality: 70 },
				jpeg: { quality: 70 },
				webp: { quality: 70 },
				avif: { quality: 70 },
			},
			resize: { width: 100, height: 100 },
		},
		[EMediaType.TABLET]: {
			convert: {
				png: { quality: 70 },
				jpeg: { quality: 80 },
				webp: { quality: 80 },
				avif: { quality: 80 },
			},
			resize: { width: 200, height: 200 },
		},
		[EMediaType.DESKTOP]: {
			convert: {
				png: { quality: 70 },
				jpeg: { quality: 90 },
				webp: { quality: 90 },
				avif: { quality: 90 },
			},
			resize: { width: 300, height: 300 },
		},
	},
});
