import {
	CloseButton as _Component,
	CloseButtonProps as _Props
} from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface CloseButtonProps
	extends PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const CloseButton: FC<CloseButtonProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
