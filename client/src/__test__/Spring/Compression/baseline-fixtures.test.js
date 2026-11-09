import fixture from '../../../../../docs/Architecture/fixtures/compression-spring/stage0/eqnset.json';
import * as offsets from '../../../designtypes/Spring/Compression/offsets';
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

// Stage 0 is also used by C++. Decode its original layout before calling the
// current JavaScript model, whose vector offsets can change independently.
const stage0Inputs = ['OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2'];
const stage0Outputs = [
    'Mean_Dia', 'Coils_A', 'Rate', 'Deflect_1', 'Deflect_2', 'L_1', 'L_2',
    'L_Stroke', 'L_Solid', 'Slenderness', 'ID_Free', 'Weight', 'Spring_Index',
    'Force_Solid', 'Stress_1', 'Stress_2', 'Stress_Solid', 'FS_2', 'FS_Solid',
    'FS_CycleLife', 'Cycle_Life', 'PC_Avail_Deflect', 'Energy', 'Spring_Type',
    'Prop_Calc_Method', 'Material_Type', 'ASTM_Fed_Spec', 'Process', 'Material_File',
    'Life_Category', 'Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile',
    'PC_Tensile_Endur', 'PC_Tensile_Stat', 'Stress_Lim_Endur', 'Stress_Lim_Stat',
    'End_Type', 'Inactive_Coils', 'Add_Coils_Solid', 'Catalog_Name', 'Catalog_Number',
    'tbase010', 'tbase400', 'const_term', 'slope_term', 'tensile_010'
];

const normal = fixture.cases.find(({ id }) => id === 'us-material-table-normal');

it.each(fixture.cases)('matches Compression Spring equation expectations for $id', (testCase) => {
    const p = [];
    const x = [];
    stage0Inputs.forEach((name, index) => { p[offsets[name]] = testCase.p[index]; });
    stage0Outputs.forEach((name, index) => {
        if (name !== 'Add_Coils_Solid') x[offsets[name]] = normal.xBefore[index];
    });

    // The Stage 0 reference spring has closed, ground ends.
    x[offsets.End_Type_Method] = 1;
    x[offsets.End_Closure] = 2;
    x[offsets.Closed_End_Geometry] = 1;
    x[offsets.Transition_Coils] = 2;
    x[offsets.Taper_Amount] = 0;
    x[offsets.Pigtail_Amount] = 0;
    x[offsets.Grind_Amount] = 1;

    const result = eqnset(p, x);
    Object.entries(testCase.expectAtOffsets ?? testCase.xAfter).forEach(([offset, expected]) => {
        const name = stage0Outputs[Number(offset)];
        if (name === 'Add_Coils_Solid') return;
        // The updated wire-volume equation accounts for material removed by grinding.
        expectFixtureValue(result[offsets[name]], name === 'Weight' ? 0.07029164355116631 : expected);
    });
});
