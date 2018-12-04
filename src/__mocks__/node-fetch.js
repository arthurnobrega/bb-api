import hashResponse from './data/hashResponse.json';
import loginResponse from './data/loginResponse.json';
import checkingBalance from './data/checkingBalance.json';
import checkingTransactions from './data/checkingTransactions.json';
import savingsList from './data/savingsList.json';
import savingsTransactions from './data/savingsTransactions.json';
import creditCardList from './data/creditCardList.json';

export default function fetch(url) {
  let textResponse = '';

  if (/hash/i.test(url)) {
    textResponse = hashResponse;
  } else if (/servico\/ServicoLogin\/login/.test(url)) {
    textResponse = loginResponse;
  } else if (/servico\/ServicoSaldo\/saldo/.test(url)) {
    textResponse = checkingBalance;
  } else if (/tela\/ExtratoDeContaCorrente\/extrato/.test(url)) {
    textResponse = checkingTransactions;
  } else if (/tela\/ExtratoDePoupanca\/entrada/.test(url)) {
    textResponse = savingsList;
  } else if (/tela\/ExtratoDePoupanca\/menuPeriodo/.test(url)) {
    textResponse = savingsTransactions;
  } else if (/tela\/ExtratoFatura\/entrada/.test(url)) {
    textResponse = creditCardList;
  }

  return {
    text: () => Promise.resolve(JSON.stringify(textResponse)),
    headers: {
      get: () => {},
    },
  };
}
