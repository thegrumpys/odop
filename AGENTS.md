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
- **JavaScript:** Follow Airbnb JavaScript Style Guide https://github.com/airbnb/javascript and Prettier code style (pnpm format); 2‑space indent.
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

**Note:** Instructions in this file should be prioritized based on the deepest nested `AGENTS.md` file.
