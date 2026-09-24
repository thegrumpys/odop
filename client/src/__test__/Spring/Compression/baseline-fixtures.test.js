import fixture from '../../../../../docs/Architecture/fixtures/compression-spring/stage0/eqnset.json';
import { eqnset } from '../../../designtypes/Spring/Compression/eqnset';

function expectFixtureValue(actual, expected) {
    if (expected === 'NaN') {
        expect(Number.isNaN(actual)).toBe(true);
    } else if (expected === 'Infinity') {
        expect(actual).toBe(Infinity);
    } else if (expected === '-Infinity') {
        expect(actual).toBe(-Infinity);
    } else if (typeof expected === 'number') {
        expect(actual).toBeCloseTo(expected, 10);
    } else {
        expect(actual).toEqual(expected);
    }
}

it('matches the versioned Compression Spring Stage 0 equation fixtures', () => {
    const normal = fixture.cases[0];
    const normalResult = eqnset([...normal.p], [...normal.xBefore]);
    normal.xAfter.forEach((expected, offset) => expectFixtureValue(normalResult[offset], expected));

    fixture.cases.slice(1).forEach((testCase) => {
        const result = eqnset([...testCase.p], [...normal.xBefore]);
        Object.entries(testCase.expectAtOffsets).forEach(([offset, expected]) => {
            expectFixtureValue(result[Number(offset)], expected);
        });
    });
});
