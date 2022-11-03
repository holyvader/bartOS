import { StoreService } from '@system/data/store/store.service';
import * as ObservableTypes from '@system/data/observable/obervable.types';
import { filterNotEmpty } from '@system/data/collection/filter-not-empty';

export class ObservableService<
	T extends object,
	EVENT extends ObservableTypes.ObservableEventBase = ObservableTypes.ObservableEventBase,
	TYPE extends EVENT['type'] = EVENT['type'],
	KEY extends KeysMatchingString<T> & string = KeysMatchingString<T> & string
> {
	private subscribers = new Map<
		ObservableTypes.Observer<T, EVENT, TYPE>,
		{ type: TYPE; context: string | null }
	>();

	constructor(
		private keyName: KEY,
		private store = new StoreService<T>(keyName)
	) {}

	add(data: T[]) {
		this.store.setMany(data);
		this.triggerEvent({
			type: 'add',
			context: getContext(data, this.keyName),
			data
		});
		return this;
	}

	remove(ids: string[]) {
		const data = this.getManyById(ids);
		this.store.removeMany(ids);
		this.triggerEvent({
			type: 'remove',
			context: getContext(data, this.keyName),
			data
		});
		return this;
	}

	removeAll() {
		const data = this.getAll();
		this.store.removeAll();
		this.triggerEvent({
			type: 'remove',
			context: getContext(data, this.keyName),
			data
		});
		return this;
	}

	getAll(): T[] {
		return Array.from(this.store.getAll());
	}

	get(id: string): T | undefined {
		return this.store.getByKey(id);
	}

	getManyById(ids: string[]): T[] {
		return filterNotEmpty(ids.map((it) => this.store.getByKey(it)));
	}

	replace(id: string, item: T) {
		this.store.replace(id, item);
		this.triggerEvent({
			type: 'replace',
			context: [id],
			data: item
		});
	}

	triggerEvent(event: EVENT | ObservableTypes.ObservableBuiltInEvent<T>) {
		for (const [fn, observer] of this.subscribers.entries()) {
			const data = (event as ObservableTypes.ObservableBuiltInEvent<T>)
				?.data as ObservableTypes.ObservableEventData<T, EVENT, TYPE>;
			if (observer.context === null && observer.type === event.type) {
				fn(data);
			} else if (
				typeof observer.context === 'string' &&
				event.context.includes(observer.context) &&
				observer.type === event.type
			) {
				if (Array.isArray(data)) {
					const filteredData = data.filter(
						(it) => it[this.keyName] === observer.context
					) as any[];
					if (filteredData.length)
						fn(
							filteredData as ObservableTypes.ObservableEventData<
								T,
								EVENT,
								TYPE
							>
						);
				} else {
					fn(data);
				}
			}
		}
	}

	subscribe<
		SUB_TYPE extends
			| EVENT['type']
			| ObservableTypes.ObservableBuiltInEvent<T>['type']
	>(
		type: SUB_TYPE,
		observer: ObservableTypes.Observer<T, EVENT, SUB_TYPE>,
		options?: { getAllOnInit?: boolean }
	): ObservableTypes.UnsubscribeFn {
		// todo resolve type mismatch later
		this.subscribers.set(
			observer as unknown as ObservableTypes.Observer<T, EVENT, TYPE>,
			{
				type: type as unknown as TYPE,
				context: null
			}
		);
		if (options?.getAllOnInit) {
			const data = Array.from(this.store.getAll());
			this.triggerEvent({
				type: 'add',
				context: getContext(data, this.keyName),
				data
			});
		}
		return () => {
			this.subscribers.delete(
				observer as unknown as ObservableTypes.Observer<T, EVENT, TYPE>
			);
		};
	}

	contextSubscribe<
		SUB_TYPE extends
			| EVENT['type']
			| ObservableTypes.ObservableBuiltInEvent<T>['type']
	>(
		type: SUB_TYPE,
		context: string,
		observer: ObservableTypes.Observer<T, EVENT, SUB_TYPE>
	): ObservableTypes.UnsubscribeFn {
		// todo resolve type mismatch later
		this.subscribers.set(
			observer as unknown as ObservableTypes.Observer<T, EVENT, TYPE>,
			{
				type: type as unknown as TYPE,
				context
			}
		);
		return () => {
			this.subscribers.delete(
				observer as unknown as ObservableTypes.Observer<T, EVENT, TYPE>
			);
		};
	}
}

function getContext<T extends object>(
	data: T[],
	key: KeysMatchingString<T>
): string[] {
	return data.map((it) => it[key] as string);
}
