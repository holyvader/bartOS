import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { Desktop } from '@programs/desktop/Desktop';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { WindowService } from '@services/window/services/window.service';

export default programManifestDefinition<
	[ProgramInstanceService, ProgramService, WindowService]
>({
	id: 'desktop',
	title: 'Desktop',
	type: ProgramType.PURE,
	definition: Desktop,
	dependencies: [
		ModuleServiceName.PROGRAM_INSTANCE,
		ModuleServiceName.PROGRAM,
		ModuleServiceName.WINDOW
	],
	runOnStartup: true
});
