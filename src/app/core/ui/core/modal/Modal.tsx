import { Modal as _Component, ModalProps as _Props } from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { FC } from 'react';

interface ModalProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Modal: FC<ModalProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
