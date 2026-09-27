# AGENTS.md

This file provides instructions and guidelines for AI coding agents working with this Node.js, Express, and React application.

## Project Overview

This is a full-stack web application built using:
- **Frontend:** React.js for the user interface.
- **Backend:** Node.js with Express.js for the server-side logic and API. Use Node 20 LTS.
- **API:** RESTful API served by Express.js.
- **Database:** MySQL https://www.mysql.com/ with four tables: design, log_usage, user, and token.

## Project Structure

The project follows a standard structure to separate frontend and backend concerns:
- **Frontend:** 'client' directory starting with the file 'public/index.html.
- **Backend:** '/' (root) directory starting with the file 'server.js'.
- **Utilities:** scripts can create and query the size of the database.

## Coding Standards and Style Guidelines

Please adhere to the following standards when contributing code:
- **JavaScript:** Do not reformat the source programming. Use a 2‑space indent.
- **React:**  Follow common React best practices. React components live under /src/components
- **API Endpoints:** Design clear and consistent RESTful API endpoints.
- **Comments:** Provide clear and concise comments.
- **Naming Conventions:** Use descriptive and consistent naming.

## Testing Requirements

- **Frontend:** Write unit tests for React components using Jest https://jestjs.io/ and integration tests. To run: "cd client; npm test"
- **Backend:** Write unit and integration tests for API endpoints and server-side logic using Mocha https://mochajs.org/, chai, and chai-http. To run: "npm test"
- **Run Tests:** Ensure all tests pass before submitting changes.

## Workflow Instructions

- **Pull Requests:** Submit well-described pull requests.
- **Commit Messages:** Use descriptive commit messages.

## Project-Specific Notes

- Connect to database using mysql2 and axios when and where possible.
- Use environment variables: FRONT_URL, JAWSDB_URL, and JAWSDB_TEST_URL for database access.
- Deploy to Heroku

## Branch-Specific Development Runtime

- On the `investigation_of_cpp_and_webasm` branch, always run the local client with
  `REACT_APP_ENABLE_COMPRESSION_SPRING_WASM=true`. This enables the Compression
  Spring C++/WebAssembly worker; do not perform development or parity testing on
  the legacy JavaScript calculation path unless the user explicitly asks for it.

## Side-by-Side Parity Testing

- Use Chrome directly (not the in-app browser) for side-by-side parity checks.
- Compare Development at `http://localhost:3000` with Staging at
  `https://odop-staging.herokuapp.com`.
- The user supplies the macro or execute file that identifies what to run; use it
  to drive both sessions from the same starting point.
- When the Design Recovery dialog appears, always select **No** to begin with a
  clean session.
- Preserve both Chrome tabs throughout a parity session. Before ending every
  turn that opened, resumed, observed, or compared those tabs, explicitly mark
  each tab for handoff so automated cleanup cannot close it. Reading or
  comparing a page must never end the session or close either tab unless the
  user explicitly requests that action.

**Note:** Instructions in this file should be prioritized based on the deepest nested `AGENTS.md` file.
