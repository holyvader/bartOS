import { Title as _Component, TitleProps as _Props } from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface TitleProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Title: FC<TitleProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
