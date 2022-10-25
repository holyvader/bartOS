import { FC } from 'react';
import {
	ActionIcon as _Component,
	ActionIconProps as _Props
} from '@mantine/core';
import {
	PropsWithColor,
	PropsWithOptionalOnClick,
	PropsWithStyleFunction
} from '@ui/ui.definition';

interface ActionIconProps
	extends PropsWithStyleFunction<_Props>,
		PropsWithColor,
		PropsWithOptionalOnClick {}

export const ActionIcon: FC<ActionIconProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
