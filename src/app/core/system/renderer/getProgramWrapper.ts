import { ProgramType } from '@system/definitions/program.definition';
import { WindowWrapper } from '@ui/program-wrappers/window/WindowWrapper';
import { PureWrapper } from '@ui/program-wrappers/pure/PureWrapper';

export function getProgramWrapper(type: ProgramType) {
	switch (type) {
		case ProgramType.WINDOW:
			return WindowWrapper;
		case ProgramType.PURE:
			return PureWrapper;
	}
}
