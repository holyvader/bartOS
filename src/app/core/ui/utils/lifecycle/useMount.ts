import { useEffect } from 'react';

export function useMount(fn: () => (() => void) | void) {
	useEffect(() => {
		const unsubscribe = fn();
		return () => {
			unsubscribe?.();
		};
	}, []);
}
