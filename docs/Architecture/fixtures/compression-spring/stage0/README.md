# Compression Spring Stage 0 baseline fixtures

These fixtures freeze the JavaScript behavior that the C++ and Wasm paths must
match.  They are deliberately data-only: no production path consumes them yet.

`eqnset.json` is the direct numerical golden data.  Its `x` vector uses the
current `offsets.js` layout and its exceptional values use the strings
`"NaN"`, `"Infinity"`, and `"-Infinity"`, because JSON has no representation
for those JavaScript numbers.  `baseline-fixtures.test.js` executes and checks
the fixture against the legacy equation set.

`manifest.json` records the wider fixture suite.  The referenced demo and
tutorial tests are the authoritative action traces for INIT, dispatcher,
objective, checks, and Hooke-Jeeves behavior until equivalent standalone
fixtures are introduced in later stages.

The fixture schema is `compression-spring-stage0/v1`.  Do not update expected
values while porting; introduce a new fixture version only after an explicit
engineering behavior decision.
