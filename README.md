# bb-api [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arthurnobrega/bb-api/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/bb-api.svg?style=flat)](https://www.npmjs.com/package/bb-api) [![Build Status](https://travis-ci.org/arthurnobrega/bb-api.svg?branch=master)](https://travis-ci.org/arthurnobrega/bb-api)

> Unofficial node.js implementation of Banco do Brasil's mobile API

## Installation

```sh
yarn add bb-api
# or
npm install bb-api --save
```

## API Usage

### Checking Account (Conta Corrente)

```javascript
import BB from 'bb-api';

const bb = new BB();
await bb.login({ branch: 'XXXXX', account: 'XXXXXXX', password: 'XXXXXXXX' });

// Recover balance
const checkingBalance = await bb.checking.getBalance();

// Recover transactions in month
const checkingTransactions = await bb.checking.getTransactions({
  year: 2018,
  month: 11,
});
```

### Savings Account (Poupança)

```javascript
import BB from 'bb-api';

const bb = new BB();
await bb.login({ branch: 'xxxxxx', account: 'xxxxxxx', password: 'xxxxxxxx' });

// Recover savings accounts available (variações, ex: 1, 51, etc)
const savingsAccounts = await bb.savings.getAccounts();

// Recover transactions from savings account in month
const savingsTransactions = await savingsAccounts[0].getTransactions({
  year: 2018,
  month: 11,
});
```

### Credit Card (Cartão de Crédito)

```javascript
import BB from 'bb-api';

const bb = new BB();
await bb.login({ branch: 'xxxxxx', account: 'xxxxxxx', password: 'xxxxxxxx' });

// Recover list of available credit cards
const creditCards = await bb.creditCard.getCards();

// Recover bills of a credit card (faturas)
const creditCardBills = await creditCards[0].getBills();

// Recover transactions from specific bill
const creditCardTransactions = await creditCardBills[0].getTransactions();
```

## Command line

Clone the repository and follow the steps bellow:

To use it via command line just execute the command below, replacing **XXXXXs** by your credentials:

```shell
$ yarn babel-node src/index.js --bbBranch="XXXXX" --bbAccount="XXXXXXX" --bbPassword="XXXXXXXX"
```

and it will print in console the last data of your account:

```javascript
{
  checkingBalance: 273.48,
  checkingTransactions: [
    {
      date: 2018-11-05T02:00:00.000Z,
      description: 'Transferido da poupança',
      amount: 840.18
    },
    {
      date: 2018-11-05T02:00:00.000Z,
      description: 'Compra com Cartão',
      amount: -10.19
    },
    {
      date: 2018-11-05T02:00:00.000Z,
      description: 'Transferência enviada 04/11 JOÃO',
      amount: -159.18
    },
    ...
  ]
}

{
  savingsAccounts: [
    {
      variation: 1,
      description: 'Poupança Ouro - Variação 1'
    },
    {
      variation: 51,
      description: 'Poupança Ouro - Variação 51'
    },
    ...
  ],
  savingsTransactions: [
    {
      date: 2018-11-16T02:00:00.000Z,
      description: 'Juros',
      amount: 0.02
    },
    {
      date: 2018-11-30T02:00:00.000Z,
      description: 'Transferencia Para Conta',
      amount: -3.92
    },
    ...
  ]
}

{
  creditCards: [
    {
      brand: 'VISA',
      modality: '74',
      cardAccountNumber: '12345678',
      cardNumber: '0000123456781111'
    },
    {
      brand: 'VISA',
      modality: '1',
      cardAccountNumber: '12345679',
      cardNumber: '0000123456781112'
    },
    ...
  ],
  creditCardBills: [
    {
      cardAccountNumber: '12345678',
      billId: '123123123',
      billDate: '25112018'
    },
    {
      cardAccountNumber: '12345678',
      billId: '123123124',
      billDate: '25102018'
    },
    ...
  ],
  creditCardTransactions: [
    {
      type: 'payment',
      date: 2018-10-22T03:00:00.000Z,
      description: 'PGTO. CASH AG. 1111 000123456 100',
      amount: 1000.12
    },
    {
      type: 'atSight',
      date: 2018-10-10T03:00:00.000Z,
      description: 'RESTAURANTE X',
      amount: -27
    },
    ...
  ],
}
```

## Contributing

1. Fork it (<https://github.com/arthurnobrega/bb-api/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
