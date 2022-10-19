import programServiceManifest from './/program/services/program.service.manifest';
import programExecutionServiceManifest from './/program-execution/services/program-execution.service.manifest';
import resourceServiceManifest from './/resource/services/resource.service.manifest';
import userServiceManifest from './/user/services/user.service.manifest';

export const systemServiceManifests = [
	programServiceManifest,
	programExecutionServiceManifest,
	resourceServiceManifest,
	userServiceManifest
];
