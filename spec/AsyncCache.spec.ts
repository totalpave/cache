
import {AsyncCache} from '../src/AsyncCache';

let data: any = {
    fname: "John"
};

class TestCache extends AsyncCache<string> {
    protected async _fetch(key: string): Promise<string> {
        return Promise.resolve((data[key]));
    }
}

describe('Cache', () => {
    let cache: TestCache = null;
    beforeEach(() => {
        cache = new TestCache();
    });

    describe('get', () => {
        it('fetches when data is not already set', (done) => {
            let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
            let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
            let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
            let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();

            cache.get('fname').then((value: string) => {
                expect(fetchSpy).toHaveBeenCalled();
                expect(hasSpy).toHaveBeenCalled();
                expect(setSpy).toHaveBeenCalled();
                expect(getSpy).toHaveBeenCalled();
                expect(value).toBe(data.fname);
                done();
            }).catch((error) => {
                fail(error.toString());
            });
        });

        it('Does not fetch when data is already set', (done) => {
            cache.get('fname').then(() => {
                let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
                let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
                let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
                let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();
                return cache.get('fname').then((value: string) => {
                    expect(fetchSpy).not.toHaveBeenCalled();
                    expect(setSpy).not.toHaveBeenCalled();
                    expect(hasSpy).toHaveBeenCalled();
                    expect(getSpy).toHaveBeenCalled();
                    expect(value).toBe(data.fname);
                    done();
                });
            }).catch((error) => {
                fail(error.toString());
            });
        });
    });

    it('can invalidate cache', (done) => {
        let fetchSpy: jasmine.Spy = (<any>spyOn)(cache, '_fetch').and.callThrough();
        let hasSpy: jasmine.Spy = (<any>spyOn)(cache, '_has').and.callThrough();
        let setSpy: jasmine.Spy = (<any>spyOn)(cache, '_set').and.callThrough();
        let getSpy: jasmine.Spy = (<any>spyOn)(cache, '_get').and.callThrough();

        cache.get('fname').then(() => {
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

            return cache.get('fname');
        }).then(() => {
            expect(fetchSpy).toHaveBeenCalled();
            expect(hasSpy).toHaveBeenCalled();
            expect(setSpy).toHaveBeenCalled();
            expect(getSpy).toHaveBeenCalled();
            done();
        }).catch((error) => {
            fail(error.toString());
        });
    });
});
