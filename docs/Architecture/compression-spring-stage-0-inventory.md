# Compression Spring Stage 0 behavioral inventory

Captured against commit `d1cfc85120db84e981f4c46d2b007f28c3324472` on 2026-09-23. This is a migration baseline, not a new persistence schema. Names below are the stable identifiers that later schema work must preserve; the numeric offsets are explicitly current-layout compatibility data.

Flags use `C` = constrained and `F` = fixed. `-` means no initial flag. `impact` describes the minimum legacy calculation work after a user change: `E` = EQNSET/objective/checks, `I+E` = INIT then EQNSET/objective/checks, `O` = objective/checks, and `UI` = no calculation.

## Computational symbols

| Flat | Stable ID | Runtime slot | Kind | Initial flags | Initial constraint / sdlim | Impact |
|---:|---|---|---|---|---|---|
| 0 | OD_Free | P[0] | independent number | - | 0.01..10 / 0.1 | E |
| 1 | Wire_Dia | P[1] | independent number | - | 0.005..2 / 0.01 | E |
| 2 | L_Free | P[2] | independent number | - | 0.1..100 / 0.1 | E |
| 3 | Coils_T | P[3] | independent number | - | 1..40 / 1 | E |
| 4 | Force_1 | P[4] | independent number | - | 0..50 / 0.01 | E |
| 5 | Force_2 | P[5] | independent number | - | 0.01..1000 / 0.1 | E |
| 6 | Mean_Dia | X[0] | dependent number | - | 0.1..10 / 0.1 | O |
| 7 | Coils_A | X[1] | dependent number | C/C | 1..50 / 1 | O |
| 8 | Rate | X[2] | dependent number | - | 1..200 / 0.1 | O |
| 9 | Deflect_1 | X[3] | dependent number | C/- | 0..20 / 0.001 | O |
| 10 | Deflect_2 | X[4] | dependent number | - | 1..20 / 0.01 | O |
| 11 | L_1 | X[5] | dependent number | - | 1..100 / 0.1 | O |
| 12 | L_2 | X[6] | dependent number | - | 1..50 / 0.1 | O |
| 13 | L_Stroke | X[7] | dependent number | - | 0.01..100 / 0.01 | O |
| 14 | L_Solid | X[8] | dependent number | - | 1..10 / 0.1; propagates valid-min to L_2 | O |
| 15 | Slenderness | X[9] | dependent number | - | 1..4 / 0.1 | O |
| 16 | ID_Free | X[10] | dependent number | - | 0.01..10 / 0.01 | O |
| 17 | Weight | X[11] | dependent number | - | 0.01..10 / 0.001 | O |
| 18 | Spring_Index | X[12] | dependent number | C/C | 4..25 / 1 | O |
| 19 | Force_Solid | X[13] | dependent number | - | 1..1000 / 0.1 | O |
| 20 | Stress_1 | X[14] | dependent number | - | 0..100000 / 1000 | O |
| 21 | Stress_2 | X[15] | dependent number | - | 100..200000 / 10000 | O |
| 22 | Stress_Solid | X[16] | dependent number | - | 100..200000 / 1000 | O |
| 23 | FS_2 | X[17] | dependent number | C/C | 1.02..1.5 / 0.1 | O |
| 24 | FS_Solid | X[18] | dependent number | C/- | 1..1.5 / 0.1 | O |
| 25 | FS_CycleLife | X[19] | dependent number | - | 1.02..1.5 / 0.1 | O |
| 26 | Cycle_Life | X[20] | dependent number | - | 10000..10010000 / 10000 | O |
| 27 | %_Avail_Deflect | X[21] | dependent number | -/C | 1..90 / 10 | O |
| 28 | Energy | X[22] | dependent number | - | 0.001..1000000 / 0.1 | O |
| 29 | Spring_Type | X[23] | calculated text | - | n/a | UI |
| 30 | Prop_Calc_Method | X[24] | configuration table | - | n/a | I+E |
| 31 | Material_Type | X[25] | configuration table/string | - | n/a | I+E |
| 32 | ASTM/Fed_Spec | X[26] | calculated text | - | n/a | UI |
| 33 | Process | X[27] | calculated text | - | n/a | UI |
| 34 | Material_File | X[28] | hidden configuration text | - | n/a | I+E |
| 35 | Life_Category | X[29] | configuration table | - | n/a | I+E |
| 36 | Density | X[30] | configuration number | - | validity >= 0 | I+E |
| 37 | Torsion_Modulus | X[31] | configuration number | - | validity >= 0 | I+E |
| 38 | Hot_Factor_Kh | X[32] | configuration number | - | validity >= 0 | I+E |
| 39 | Tensile | X[33] | configuration number | - | validity >= 0 | I+E |
| 40 | %_Tensile_Endur | X[34] | configuration number | - | validity >= 0 | I+E |
| 41 | %_Tensile_Stat | X[35] | configuration number | - | validity >= 0 | I+E |
| 42 | Stress_Lim_Endur | X[36] | configuration number | - | validity >= 0 | I+E |
| 43 | Stress_Lim_Stat | X[37] | configuration number | - | validity >= 0 | I+E |
| 44 | End_Type | X[38] | configuration table | - | n/a | I+E |
| 45 | Inactive_Coils | X[39] | configuration number | - | validity > 0 | I+E |
| 46 | Add_Coils@Solid | X[40] | configuration number | - | n/a | I+E |
| 47 | Catalog_Name | X[41] | catalog text | - | n/a | UI |
| 48 | Catalog_Number | X[42] | catalog text | - | n/a | UI |
| 49 | tbase010 | X[43] | hidden material constant | - | n/a | I+E |
| 50 | tbase400 | X[44] | hidden material constant | - | n/a | I+E |
| 51 | const_term | X[45] | hidden derived material constant | - | n/a | I+E |
| 52 | slope_term | X[46] | hidden derived material constant | - | n/a | I+E |
| 53 | tensile_010 | X[47] | hidden material constant | - | n/a | I+E |

Validity limits are retained in `initialState.js` for every numeric symbol and are intentionally not normalized here. Stage 2 must copy them directly into extended slots; this table is an audit index, not a replacement source.

## Dispatcher behavior to retain

| Trigger | Current behavior | Future destination |
|---|---|---|
| Startup, load, restore autosave | INIT, EQNSET, propagation, scale denominators, objective, checks | hydration transaction |
| Engineering symbol value | table expansion where applicable; INIT for calc inputs; clear catalog selection for catalog-driving values; EQNSET, propagation, objective, checks | worker `applyChanges` transaction |
| Fix independent | save constraints; set `F` on min/max; optional value update | compiled optimization problem |
| Fix dependent | save constraints; set `F|C` on min/max; constrain both sides to current/entered value | compiled optimization problem |
| Free | restore saved output constraints; EQNSET, propagation, objective, checks | compiled optimization problem |
| Constraint / flags | update objective and checks; FDCL copies source value into sink constraint | constraint compiler / model rules |
| System controls or input-vector restore | clear catalog fields; EQNSET, propagation, objective, checks; deliberately no INIT | worker recalculation |
| Search | clone Redux state, compress free P values, Hooke-Jeeves via `patsh`, expand values, final recalculation | C++ optimizer |

`init.js` has an additional UI side effect: it changes visibility, input state, and the `Material_Type` representation for property methods 1–3. The numerical/resource effects belong in Stage 4; the visibility and editability effects belong in the UI schema/worker result patch.

## Frozen behavioral details

- The direct fixture includes intentional `NaN` and infinity outcomes for singular geometry and zero active coils. A port must preserve these until a separately approved validation change.
- `L_Solid` propagates its calculated value to `L_2`'s valid minimum after every normal calculation.
- A material-table selection dynamically expands the selected table row into several individual symbol changes before INIT.
- The search only varies non-fixed independent `P` entries. It returns the exact messages listed in the fixture manifest for feasibility, maximum iterations, step exhaustion, zero free variables, inconsistent constraints, and infinite objective cases.
- Current scale denominators use `sclden`: `abs(level)/fix_wt + smallnum` for fixed values, otherwise `abs(level)/con_wt + smallnum`, floored by `sdlim`.

## Evidence and execution

Run the frozen direct fixture with:

```sh
cd client && npm test -- --runInBand baseline-fixtures.test.js
```

Run the full existing Compression Spring regression suite with:

```sh
cd client && npm test -- --runInBand Spring/Compression
```

The data is under [fixtures/compression-spring/stage0](fixtures/compression-spring/stage0/README.md). The legacy source remains the compatibility oracle through Stage 3.
