
import {ICacheData} from './ICacheData';
import {ICache} from './ICache';

export abstract class AsyncCache<T> implements ICache {
    private _cache: ICacheData<T>;

    public constructor() {
        this._cache = {};
    }

    protected abstract async _fetch(key: string): Promise<T>;

    public async get(key: string): Promise<T> {
        if (!this._has(key)) {
            let value: T = await this._fetch(key);
            this._set(key, value);
        }
        return this._get(key);
    }

    protected _set(key: string, value: T): void {
        this._cache[key] = value;
    }

    protected _has(key: string): boolean {
        return this._cache[key] !== undefined;
    }

    protected _get(key: string): T {
        return this._cache[key];
    }

    public invalidate(): void {
        this._cache = {};
    }
}
