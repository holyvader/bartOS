export interface EventFrom<T> {
	type: 'from';
	data: T[];
}

export interface EventAdd<T> {
	type: 'add';
	data: T[];
}

export interface EventRemove<T> {
	type: 'remove';
	data: T[];
}

export type EventType = ObservableEvent<unknown>['type'];

export type EventByType<
	TWhere,
	T extends ObservableEvent<T>['type']
> = TWhere extends {
	type: infer InferredT;
}
	? InferredT extends T
		? TWhere & { type: T }
		: never
	: never;

export type ObservableEvent<T> = EventFrom<T> | EventAdd<T> | EventRemove<T>;
export type ObservableEventData<T, TYPE extends EventType> = EventByType<
	ObservableEvent<T>,
	TYPE
>['data'];

export type Observer<T, TYPE extends EventType> = (
	data: ObservableEventData<T, TYPE>
) => void;

export type UnsubscribeFn = () => void;
