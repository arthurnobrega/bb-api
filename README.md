# bb-api [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arthurnobrega/bb-api/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/bb-api.svg?style=flat)](https://www.npmjs.com/package/bb-api) [![Build Status](https://travis-ci.org/arthurnobrega/bb-api.svg?branch=master)](https://travis-ci.org/arthurnobrega/bb-api)

> Unofficial node.js implementation of Banco do Brasil's mobile API

## Installation

```sh
yarn add bb-api
# or
npm install bb-api --save
```

## Example

```javascript
import BB from 'bb-api';

const bb = new BB();

bb.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' })
  .then(() => bb.checking.getBalance())
  .then(() => bb.checking.getTransactions({ year: 2018, month: 10 }))
  .then(() =>
    bb.savings.getTransactions({ variation: 51, year: 2018, month: 10 }),
  );
```

## Contributing

1. Fork it (<https://github.com/arthurnobrega/bb-api/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
