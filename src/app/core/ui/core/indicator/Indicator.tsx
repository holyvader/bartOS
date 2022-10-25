import {
	Indicator as _Component,
	IndicatorProps as _Props
} from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface IndicatorProps
	extends WithChildren,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Indicator: FC<IndicatorProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
