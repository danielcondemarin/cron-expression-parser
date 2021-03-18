## Cron expression parser

### Pre-requirements

- [Nodejs](https://nodejs.org/en/download/)

### Installation

```
$ npm install
```

### Using the parser

```
$ npm run parse "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Testing

```
$ npm test
```

### Notes

Due to time complex cron expressions like `* 1-3,4-6 * * * *` or `* */2,3-5 * * * *` are not handled. It should not be difficult to extend the [list](./src/parser/operations/list.ts) parser to implement this.

