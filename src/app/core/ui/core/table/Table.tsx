import { Table as _Component, TableProps as _Props } from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface TableProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Table: FC<TableProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
