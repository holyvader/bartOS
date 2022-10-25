import { FC } from 'react';
import { Box as _Component, BoxProps as _Props } from '@mantine/core';
import { PropsWithStyleFunction } from '@ui/ui.definition';

type BoxProps = PropsWithStyleFunction<_Props>;

export const Box: FC<BoxProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
