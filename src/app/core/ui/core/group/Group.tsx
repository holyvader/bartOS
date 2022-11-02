import {
	Group as _Component,
	GroupProps as _Props
} from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface GroupProps
	extends WithOptionalChildren, PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Group: FC<GroupProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
