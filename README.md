### Cron expression parser


#### Pre-requirements

- [Nodejs](https://nodejs.org/en/download/)

#### Installation

```
$ git clone https://github.com/danielcondemarin/cron-expression-parser && cd cron-expression-parser
$ npm install
```

#### Using the parser

```
$ npm run parse "*/15 0 1,15 * 1-5 /usr/bin/find"
```

#### Testing

```
$ npm test
```

or to watch for changes:

```
$ npm run test:watch
```

#### Notes

Due to time, more complex "list" and "step" cron expressions like the following are not handled. 
- `* 1-3,4-6 * * * cmd` 
- `* */2,3-5 * * * cmd` 
- `23 0-23/2 * * * cmd`

It should not be difficult to extend the [list](./src/parser/operations/list.ts) and [step](./src/parser/operations/step.ts) parsers to implement these.

