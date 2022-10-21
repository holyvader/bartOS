import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { Desktop } from '@programs/desktop/Desktop';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ProgramExecutionService } from '@services/program-execution/services/program-execution.service';
import { ProgramService } from '@services/program/services/program.service';
import { WindowService } from '@services/window/services/window.service';

export default programManifestDefinition<
	[ProgramExecutionService, ProgramService, WindowService]
>({
	id: 'desktop',
	title: 'Desktop',
	type: ProgramType.PURE,
	definition: Desktop,
	dependencies: [
		ModuleServiceName.PROGRAM_EXECUTION,
		ModuleServiceName.PROGRAM,
		ModuleServiceName.WINDOW
	],
	runOnStartup: true
});
