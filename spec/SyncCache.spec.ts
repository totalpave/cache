
import {SyncCache} from '../src/SyncCache';

let data: any = {
    fname: "John"
};

class TestCache extends SyncCache<string> {
    protected _fetch(key: string): string {
        return data[key];
    }
}

describe('Cache', () => {
    let cache: TestCache = null;
    beforeEach(() => {
        cache = new TestCache();
    });

    describe('get', () => {
        it('fetches when data is not already set', () => {
            let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
            let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
            let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
            let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();

            let value: string = cache.get('fname');

            expect(fetchSpy).toHaveBeenCalled();
            expect(hasSpy).toHaveBeenCalled();
            expect(setSpy).toHaveBeenCalled();
            expect(getSpy).toHaveBeenCalled();
            expect(value).toBe(data.fname);
        });

        it('Does not fetch when data is already set', () => {
            let value: string = cache.get('fname');

            let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
            let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
            let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
            let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();

            value = cache.get('fname');
            
            expect(fetchSpy).not.toHaveBeenCalled();
            expect(setSpy).not.toHaveBeenCalled();
            expect(hasSpy).toHaveBeenCalled();
            expect(getSpy).toHaveBeenCalled();
            expect(value).toBe(data.fname);
        });
    });

    it('can invalidate cache', () => {
        let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
        let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
        let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
        let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();

        cache.get('fname');
        
        expect(fetchSpy).toHaveBeenCalled();
        expect(hasSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();

        fetchSpy.calls.reset();
        hasSpy.calls.reset();
        setSpy.calls.reset();
        getSpy.calls.reset();

        expect(fetchSpy).not.toHaveBeenCalled();
        expect(hasSpy).not.toHaveBeenCalled();
        expect(setSpy).not.toHaveBeenCalled();
        expect(getSpy).not.toHaveBeenCalled();

        cache.invalidate();

        cache.get('fname');
        
        expect(fetchSpy).toHaveBeenCalled();
        expect(hasSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();
    });
});
