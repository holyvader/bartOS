import { StoreService } from '@system/data/store/store.service';
import * as ObservableTypes from '@system/data/observable/obervable.types';
import { filterNotEmpty } from '@system/data-manipulation/collection/filter-not-empty';

export class ObservableService<T extends object> {
	private subscribers = new Map<
		ObservableTypes.Observer<T, ObservableTypes.EventType>,
		ObservableTypes.EventType
	>();

	constructor(
		private keyName: KeysMatchingString<T> & string,
		private store = new StoreService<T>(keyName)
	) {}

	from(data: T[]) {
		this.store.setMany(data);
		this.triggerEvent('from', data);
		return this;
	}

	addMany(data: T[]) {
		this.store.setMany(data);
		this.triggerEvent('add', data);
		return this;
	}

	removeMany(ids: string[]) {
		const elements = this.getManyById(ids);
		this.store.removeMany(ids);
		this.triggerEvent('remove', elements);
		return this;
	}

	getAll(): IterableIterator<T> {
		return this.store.getAll();
	}

	get(id: string): T | undefined {
		return this.store.getByKey(id);
	}

	getManyById(ids: string[]): T[] {
		return filterNotEmpty(ids.map( it => this.store.getByKey(it)));
	}

	triggerEvent<TYPE extends ObservableTypes.EventType>(
		type: TYPE,
		data: ObservableTypes.ObservableEventData<T, TYPE>
	) {
		for (const [fn, observerType] of this.subscribers.entries()) {
			if (observerType === type) {
				fn(data);
			}
		}
	}

	subscribe<TYPE extends ObservableTypes.EventType>(
		type: TYPE,
		observer: ObservableTypes.Observer<T, TYPE>
	): ObservableTypes.UnsubscribeFn {
		this.subscribers.set(observer, type);

		return () => {
			this.subscribers.delete(observer);
		};
	}
}
