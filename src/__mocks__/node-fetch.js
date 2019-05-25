import hashResponse from './data/hashResponse.json';
import loginResponse from './data/loginResponse.json';
import checkingBalance from './data/checkingBalance.json';
import checkingTransactions from './data/checkingTransactions.json';
import savingsList from './data/savingsList.json';
import savingsTransactions from './data/savingsTransactions.json';
import creditCardList from './data/creditCardList.json';
import creditCardBills from './data/creditCardBills.json';
import creditCardBillTransactions from './data/creditCardBillTransactions.json';
import creditCardCurrentBillTransactions from './data/creditCardCurrentBillTransactions.json';

export default function fetch(url, { headers, body }) {
  let textResponse = '';
  let headersReponse = {};

  if (/hash/i.test(url)) {
    textResponse = hashResponse;
  } else if (/servico\/ServicoLogin\/login/.test(url)) {
    textResponse = loginResponse;
    headersReponse = {
      'set-cookie': 'JSESSIONID=fake; path=/; HttpOnly',
    };
  } else {
    if (!headers.cookie) {
      throw new Error('no cookie');
    }

    if (/servico\/ServicoSaldo\/saldo/.test(url)) {
      textResponse = checkingBalance;
    } else if (/tela\/ExtratoDeContaCorrente\/extrato/.test(url)) {
      textResponse = checkingTransactions;
    } else if (/tela\/ExtratoDePoupanca\/entrada/.test(url)) {
      textResponse = savingsList;
    } else if (/tela\/ExtratoDePoupanca\/menuPeriodo/.test(url)) {
      textResponse = savingsTransactions;
    } else if (/tela\/ExtratoFatura\/entrada/.test(url)) {
      textResponse = creditCardList;
    } else if (/tela\/ExtratoFatura\/mesAnterior/.test(url)) {
      textResponse = creditCardBills;
    } else if (/tela\/ExtratoFatura\/extrato/.test(url)) {
      if (body === 'numeroContaCartao=12345678') {
        textResponse = creditCardCurrentBillTransactions;
      } else {
        textResponse = creditCardBillTransactions;
      }
    }
  }

  return {
    text: () => Promise.resolve(JSON.stringify(textResponse)),
    headers: {
      get: item => headersReponse[item],
    },
  };
}
