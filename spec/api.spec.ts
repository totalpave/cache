import {AsyncCache} from '../src/AsyncCache';
import {SyncCache} from '../src/SyncCache';
import * as api from '../src/api';

describe('Public API', () => {
    it('AsyncCache', () => {
        expect(api.AsyncCache).toBe(AsyncCache);
    });

    it('SyncCache', () => {
        expect(api.SyncCache).toBe(SyncCache);
    });
});
