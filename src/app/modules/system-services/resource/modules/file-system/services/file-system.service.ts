import { ServiceImpl } from '@system/definitions/injectable-service.definition';

export class FileSystemService implements ServiceImpl {
	run() {
		console.info('[fileSystemService] running');
	}
}
