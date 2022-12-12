import { Text as _Component, TextProps as _Props } from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface TextProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Text: FC<TextProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
