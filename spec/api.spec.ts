import {Cache} from '../src/Cache';
import * as api from '../src/api';
import DefaultCache from '../src/api';

describe('Public API', () => {
    it('Cache', () => {
        expect(api.Cache).toBe(Cache);
    });

    it('Cache (Default)', () => {
        expect(DefaultCache).toBe(Cache);
    });
});
