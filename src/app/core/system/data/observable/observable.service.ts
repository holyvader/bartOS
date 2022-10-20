import { StoreService } from '@system/data/store/store.service';
import * as ObservableTypes from '@system/data/observable/obervable.types';
import { filterNotEmpty } from '@system/data-manipulation/collection/filter-not-empty';

export class ObservableService<
	T extends object,
	EVENT extends ObservableTypes.ObservableEventBase = ObservableTypes.ObservableEventBase,
	TYPE extends EVENT['type'] = EVENT['type']
> {
	private subscribers = new Map<
		ObservableTypes.Observer<T, EVENT, TYPE>,
		TYPE
	>();

	constructor(
		private keyName: KeysMatchingString<T> & string,
		private store = new StoreService<T>(keyName)
	) {}

	add(data: T[]) {
		this.store.setMany(data);
		this.triggerEvent({ type: 'add', data });
		return this;
	}

	remove(ids: string[]) {
		const data = this.getManyById(ids);
		this.store.removeMany(ids);
		this.triggerEvent({ type: 'remove', data });
		return this;
	}

	removeAll() {
		const data = this.getAll();
		this.store.removeAll();
		this.triggerEvent({ type: 'remove', data });
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
			data: item
		});
	}

	triggerEvent(event: EVENT | ObservableTypes.ObservableBuiltInEvent<T>) {
		for (const [fn, observerType] of this.subscribers.entries()) {
			if (observerType === event.type) {
				fn((event as { data: any })?.data);
			}
		}
	}

	subscribe<
		TYPE extends
			| EVENT['type']
			| ObservableTypes.ObservableBuiltInEvent<T>['type']
	>(
		type: TYPE,
		observer: ObservableTypes.Observer<T, EVENT, TYPE>
	): ObservableTypes.UnsubscribeFn {
		this.subscribers.set(observer as any, type as any);
		return () => {
			this.subscribers.delete(observer as any);
		};
	}
}

type Z = ObservableTypes.Observer<{ a: string }, never, 'add'>;
