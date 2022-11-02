import { ResourceTreeViewer } from '@ui/resource-tree-viewer/ResourceTreeViewer';
import { FC } from 'react';
import { Box } from '@ui/core/box/Box';
import { StyleWithTheme } from '@ui/ui.definition';

export const ResourceViewer: FC = () => {
	return (
		<Box style={wrapperStyle}>
			<ResourceTreeViewer path="<home>/desktop" />
		</Box>
	);
};

const wrapperStyle: StyleWithTheme = ({ spacing }) => ({
	padding: spacing.lg
});
