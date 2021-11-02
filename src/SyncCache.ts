
import {ICacheData} from './ICacheData';
import {ICache} from './ICache';

export abstract class SyncCache<T> implements ICache {
    private $cache: ICacheData<T>;

    public constructor() {
        this.$cache = {};
    }

    protected abstract _fetch(key: string): T;

    public get(key: string): T {
        if (!this._has(key)) {
            let value: T = this._fetch(key);
            this._set(key, value);
        }
        return this._get(key);
    }

    protected _set(key: string, value: T): void {
        this.$cache[key] = value;
    }

    protected _has(key: string): boolean {
        return this.$cache[key] !== undefined;
    }

    protected _get(key: string): T {
        return this.$cache[key];
    }

    public invalidate(): void {
        this.$cache = {};
    }
}
