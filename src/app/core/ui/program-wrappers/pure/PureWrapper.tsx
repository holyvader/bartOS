import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { FC } from 'react';

interface PureWrapperProps extends WithChildren {
	manifest: ProgramInstanceManifest;
}

export const PureWrapper: FC<PureWrapperProps> = ({ children }) => {
	return <>{children}</>;
};
