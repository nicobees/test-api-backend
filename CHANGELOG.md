This CHANGELOG file contains the main features and changes applied to the application, following the main specs specified in the instructions of the README file.

---

### v0.2.0

Achievements:

- working Rest API in local environment
- data retrieved from MongoDB following specs
- basic instructions on how to initialise and run app and tests locally
- (simple) log management
- StandardJS code style
- environment and env variables management
- simplified 3-tier architecture (actually now a 2-tier architecture)

Still TODO:

- deploy application on a remote host (Heroku will be used)
- Unit Tests, following this priority order and considering the time still available to complete the test:
    - high value features/components
    - edge cases in high value features/components
    - things that are easy to break
    - most important components
- Integration Test: for the unique exposed POST API

To Improve in future versions:

- improve log management: add also http request/response logs
- improve file structure: 3-tier architecture with components as main APIs
- manage localisation and timezones (to carry edge cases in request where date appear)
- manage auto validation of environment variables (to be checked at server startup, check can be run also during deploy pipeline)
- create deploy pipeline (with environment variable check, code lint, unit tests and integration tests, typescript build and deploy to remote host)

---

### v0.1.0

Project setup initialisation:

- intialisation scripts: watch on change with nodemon, debugger configuration for VisualStudioCode
- ESLint and StandardJS setup, including Visual Studio Code settings and extensions: fix and prettify on file save for `.ts` and `.test.ts` files
- Jest and `supertest` setup for UnitTesting
- ready to start implementing features accordingly with instructions and design specs



