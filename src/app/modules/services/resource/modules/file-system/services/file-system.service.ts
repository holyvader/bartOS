import { ServiceImpl } from '@system/definitions/module-service.definition';

export class FileSystemService implements ServiceImpl {
	init() {
		console.info('[fileSystemService] running. No files initialized.');
	}
}
