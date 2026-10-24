# Recurring release tests

Server and client tests run separately on Windows and macOS using the existing
Mocha/Chai and Jest/React setup. No additional testing tools are needed.

## Server tests

From the repository root, run `npm test` or `npm run test`.
This runs only the server tests under `test`. It does not enter the client
directory, run UI tests, or build the client.

The additional `test/api_user_workflows_test.js` tests registration, confirmation,
login/logout, cookie sessions, password reset, expired/reused tokens, design
persistence and access restrictions. It uses its own design fixture under
`test/fixtures`. HTTP, MySQL and password hashing are real; outgoing SMTP is
intercepted, so these tests send no email.

Configure `ENABLE_DB=true`, `JAWSDB_TEST_URL` and `SESSION_SECRET` as for the
existing server suite. Use a dedicated test database: existing tests clear its
tables. The new workflow tests use unique records and clean up their own data.

## Client tests

Open a terminal in the `client` directory and run `npm test` or `npm run test`.
For a noninteractive run, use `npm test -- --watchAll=false --runInBand`.

The additional `src/__test__/UserWorkflows.test.js` renders the actual application
with React, routing, Redux, calculations, dialogs and browser storage. Only HTTP
and usage logging are replaced. The 30 tests cover design types/views, metric
spring startups, editing, constraints, Search/Seek/Trade, automatic search,
variable dialogs, Save As/Save/Open, errors and account workflows.

These tests use Jest's simulated browser (jsdom), not an installed browser, and
require no server or database.

## Manual browser checks

On Windows and macOS, check the deployed application in a supported browser:

1. Open and refresh a direct account URL.
2. Edit a design and run Search/Seek; verify layout and calculation indicators.
3. Save/reopen a design and export/import JSON using real file dialogs.
4. Print a multipage report and check page breaks and navigation overlap.
5. Follow confirmation/password-reset emails in the test environment.

Record OS, browser/version and results with the release results. jsdom cannot
verify actual browser painting, native file dialogs, printing, deployed routing
or email delivery.
