import programServiceManifest from '@system-services/program/services/program.service.manifest';
import programExecutionServiceManifest from '@system-services/program-execution/services/program-execution.service.manifest';
import resourceServiceManifest from '@system-services/resource/services/resource.service.manifest';
import userServiceManifest from '@system-services/user/services/user.service.manifest';

export const systemServiceManifests = [
	programServiceManifest,
	programExecutionServiceManifest,
	resourceServiceManifest,
	userServiceManifest
];
