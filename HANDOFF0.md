# Stage 0 handoff — Compression Spring behavioral baseline

## Completed

- Read and followed the migration plan in `docs/Architecture/computational-engine-wasm-plan.md`.
- Added a complete 54-symbol Compression Spring inventory in `docs/Architecture/compression-spring-stage-0-inventory.md`:
  - stable symbol IDs;
  - current flat table index and P/X offset;
  - kind, initial flags, constraints/scale denominator limit, and change impact;
  - dispatcher, propagation, catalog-reset, INIT, objective/check, and search behavior.
- Added versioned Stage 0 fixtures in `docs/Architecture/fixtures/compression-spring/stage0/`:
  - `eqnset.json` records a full direct US-material EQNSET input/output vector and three singular behavior cases;
  - `manifest.json` ties the direct fixture to the existing demos/tutorials, records representative objective values, and freezes search termination-message text;
  - `README.md` defines the fixture contract and JSON representations for `NaN`/infinity.
- Added `client/src/__test__/Spring/Compression/baseline-fixtures.test.js`, which runs the legacy JavaScript equation set against the new versioned direct fixture.

## Important baseline observations

- The legacy direct reference case uses `Wire_Dia = 0.1055`; the UI initial state itself uses `0.105`. Treat the fixture input as authoritative for its exact expected output.
- Singular states intentionally yield `NaN` and/or infinities. Do not sanitize them while porting without an explicit engineering decision and a fixture-version change.
- `L_Solid` propagates to `L_2`'s valid minimum.
- Material/property-method/end-type updates require INIT; normal independent P edits require EQNSET, propagation, objective, and checks.
- Legacy search clones Redux state and calls `patsh`; future work must preserve its stopping conditions and message text.

## Verification

- Focused fixture test: `cd client && npm test -- --runInBand baseline-fixtures.test.js`
- Full Compression Spring regression suite: `cd client && npm test -- --runInBand Spring/Compression`

Stage 0 verification completed successfully:

- Focused fixture test: 1 suite / 1 test passed.
- Full Compression Spring regression suite: 13 suites / 16 tests passed.

The test runner reported only the existing stale `caniuse-lite` Browserslist-data advisory.

## Next stage

Stage 1 can add the C++20/CMake and minimal Piston-Cylinder native/Wasm smoke build. It should not change the React product path or these fixture expectations.
