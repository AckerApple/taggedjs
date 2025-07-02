import { byId, click, count } from "./testing/elmSelectors";
import { expect, it, describe } from "./testing/expect";
describe('🏹 special attributes', () => {
    it('style and class tests', async () => {
        expect(count('#attr-input-abc')).toBe(1);
        expect(count('#toggle-backgrounds')).toBe(1);
        expect(byId('attr-style-strings').style.backgroundColor).toBe('orange');
        expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange')).toBe(true);
        expect(new Array(...byId('attr-inline-class').classList).includes('background-orange')).toBe(true);
        expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange')).toBe(true);
        click('#toggle-backgrounds');
        expect(byId('attr-style-strings').style.backgroundColor).toBe('');
        expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange')).toBe(false);
        expect(new Array(...byId('attr-inline-class').classList).includes('background-orange')).toBe(false);
        expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange')).toBe(false);
        // put back
        click('#toggle-backgrounds');
        expect(byId('attr-style-strings').style.backgroundColor).toBe('orange');
        expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange')).toBe(true);
        expect(new Array(...byId('attr-inline-class').classList).includes('background-orange')).toBe(true);
        expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange')).toBe(true);
    });
});
//# sourceMappingURL=attributes.test.js.map