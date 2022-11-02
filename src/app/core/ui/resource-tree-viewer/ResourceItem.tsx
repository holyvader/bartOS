import { StyleWithTheme } from '@ui/ui.definition';
import { FC } from 'react';
import { ResourceType } from '@system/definitions/resource.definition';
import { ResourceIcon } from '@ui/resource-tree-viewer/ResourceIcon';
import { Box } from '@ui/core/box/Box';

interface ResourceItemProps {
	name: string;
	type: ResourceType;
}

export const ResourceItem: FC<ResourceItemProps> = ({ type, name }) => {
	return (
		<Box style={itemStyle}>
			<div>
				<ResourceIcon type={type} size={64} />
			</div>
			<div>
				{name}.{type}
			</div>
		</Box>
	);
};

const itemStyle: StyleWithTheme = ({ colors, fontSizes, radius }) => ({
	transition: 'all 0.15s ease-in-out',
	color: colors.lightGrey[6],
	fontSize: fontSizes.md,
	cursor: 'pointer',
	width: 128,
	height: 128,
	textAlign: 'center',
	display: 'grid',
	gridTemplateRows: 'minmax(0, 1fr)  22px',
	justifyItems: 'center',
	alignItems: 'center',
	borderRadius: radius.md,
	'&:hover': {
		background: `${colors.lightGrey[6]}22`
	}
});
