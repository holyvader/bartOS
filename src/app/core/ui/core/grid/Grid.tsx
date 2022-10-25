import { FC } from 'react';
import { Grid as _Component, GridProps as _Props } from '@mantine/core';
import { PropsWithStyleFunction } from '@ui/ui.definition';
import { ColProps } from '@mantine/core/lib/Grid/Col/Col';

type GridProps = PropsWithStyleFunction<_Props>;

export const Grid: FC<GridProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};

export const GridCol: FC<ColProps> = (props) => {
	return <_Component.Col {...props} />;
};
