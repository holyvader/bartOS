import { FC } from 'react';
import {
	ThemeIcon as _Component,
	ThemeIconProps as _Props
} from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';

interface ThemeIconProps
	extends PropsWithStyleFunction<_Props>,
		PropsWithColor {}

export const ThemeIcon: FC<ThemeIconProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
