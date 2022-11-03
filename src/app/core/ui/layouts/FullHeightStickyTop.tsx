import { FC, ReactNode } from 'react';
import { Box } from '@ui/core/box/Box';

interface FullHeightStickyTopProps extends WithChildren {
	topHeight?: number;
	top: ReactNode;
}

export const FullHeightStickyTop: FC<FullHeightStickyTopProps> = ({
	top,
	children,
	topHeight
}) => {
	return (
		<Box
			style={{
				position: 'relative',
				height: '100%'
			}}>
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: topHeight
				}}>
				{top}
			</Box>
			<Box
				style={{
					position: 'absolute',
					top: topHeight,
					left: 0,
					right: 0,
					bottom: 0,
					overflow: 'hidden auto'
				}}>
				{children}
			</Box>
		</Box>
	);
};
