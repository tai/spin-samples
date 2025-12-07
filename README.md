# spin-samples

Sample Spin applications using the '@spinframework/spin-*' APIs.

## Available samples

- hello-spin    - Minimal 'hello, world' application
- hello-kvs     - Sample to use cloud key-value storage API
- hello-sqlite  - Sample to use cloud SQLite storage API
- hello-http    - Sample to fetch thid-party content over HTTP
- hello-cron    - Sample to use cloud cron API
- hello-llm     - Sample to use cloud LLM API
- hello-llm-ext - Sample to use third-party LLM API

## Setup

Top-level Makefile is provided for initial setup.

```
$ make setup
```

will install spin CLI and plugins.

## Testing an app

Each sample resides in a separate, independent folder.
Prior to deployment, some apps require setup like database initialization.
Makefile is provided to automate these tasks.

```
// initialization
$ make setup
// build WASM binary
$ make build
// run locally (if supported)
$ make up
// deploy
$ make deploy
```

are generally supported, but just type `make` to see what is available.
