# bb-api
> Unofficial node.js implementation of Banco do Brasil's mobile API

## Installation

```sh
yarn add bb-api
# or
npm install bb-api --save
```

## Example

```javascript
  import BB from 'bb-api'

  const bb = new BB()

  bb.login({ branch: '12345', account: '123456', password: '12345678' })
    .then(() => bb.getBalance())
    .then(balance => console.log(balance))
    .then(() => bb.getTransactions({ year: '2018', month: '05' }))
    .then(transactions => console.log(transactions))
```

## Contributing

1. Fork it (<https://github.com/arthurnobrega/bb-api/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request