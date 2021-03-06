## Test API Backend

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a NodeJS-Express application written in Typescript. It exposes a single RestAPI that allows to retrieve data from a connected MongoDB instance. It uses StandardJS code style.

These are the main modules used in the app:
- `Mongoose` as driver to connect to a MongoDB instance
- `winston` to manage log
- `express-validator` to validate request data
- `dotenv` and `config` to load environment variables and manage different environments
- `jest` and `supertest` for Unit Tests and Integration Tests

It implements a (simplified and hopefully not over engineered) basic version of a 3-tier architecture: for each component (usually an exposed API path), there are a Controller (manages request and response and the express client itself), Service (manages the business logic), Repository (manages the retrieve and store operations with external data sources, i.e. database, file storage, ecc). The 3-tier architecture is based on Dependency Injection and Inversion of Control, in order to make each tier independent, reusable, easily-swappable, easily-testable-mockable.
In this case, since it is a basic application, with simple specs, the Service tier has not been implemented in order to avoid over-engineering. 

----

## Contributing

### Initial setup

1. First install the dependencies
```
npm install
```

2. Then complete the code style configuration: the project uses `standard` code style. All the necessary modules are installed through `npm install`, but run the following steps for a complete setup:

    1. Install `standard` extension for your IDE: see [here](https://github.com/standard/standard#are-there-text-editor-plugins) for instructions
    2. Activate auto fix/lint on save on the IDE `standard` extension: if you are using Visual Studio Code this setting is already present (see `.vscode/settings.json`)

Now everything is ready to code and to run the application.

### Run
These are all the available ways to run the application

1. Run locally without ts transpilation, it starts with debugger on port 9949:

```
npm run dev
```

2. Run locally in watch mode, it starts with debugger on port 9949:

```
npm run dev:watch
```

3. Run locally with ts transpilation:

```
npm run start
```

4. Run locally with ts transpilation, it starts with debugger on port 9949:

```
npm run start:debug
```

### Test
These are the ways to run tests locally

1. Run tests, with coverage

```
npm run test
```

2. Run tests in watch mode

```
npm run test:watch
```

### Deploy to remote host
These are the instructions to deploy the application to Heroku.

1. Create an Heroku account: see [here](https://signup.heroku.com/dc)
2. Install the Heroku CLI: see [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
3. Open a terminal in the project root and run this command to login into Heroku from CLI:

    ```
    heroku login
    ```
4. Create an Heroku app (region parameter is optional)

    ```
    heroku apps:create example-app --region eu
    ```

    This command will automatically set a new remote in the local git repository that points to the heroku remote repository, it also returns the git remote repository path and the public exposed endpoint of the application
5. Deploy the app to the Heroku remote with this command:

    ```
    git push heroku main
    ```
6. Open the app with this command:

    ```
    heroku open
    ```
