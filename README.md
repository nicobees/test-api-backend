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
npm run watch
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
