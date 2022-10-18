import { ProgramType } from '@system/definitions/program.definition';
import { withWindowWrapper } from '@ui/program-wrappers/window/withWindowWrapper';
import { withPureWrapper } from '@ui/program-wrappers/pure/withPureProgram';

export function useProgramWrapper() {
	return (type: ProgramType) => {
		switch (type) {
			case ProgramType.WINDOW:
				return withWindowWrapper;
			case ProgramType.PURE:
				return withPureWrapper;
		}
	};
}
