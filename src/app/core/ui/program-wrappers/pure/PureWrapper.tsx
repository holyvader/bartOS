import React from 'react';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';

interface PureWrapperProps {
	children: any;
	manifest: ProgramInstanceManifest;
}

export const PureWrapper: React.FC<PureWrapperProps> = ({
	children,
	manifest
}) => {
	return <>{children}</>;
};
