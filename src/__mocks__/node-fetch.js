import hashResponse from './data/hashResponse.json';
import loginResponse from './data/loginResponse.json';
import checkingBalance from './data/checkingBalance.json';
import checkingTransactions from './data/checkingTransactions.json';
import savingsList from './data/savingsList.json';

export default function fetch(url) {
  let textResponse = '';
  let jsonResponse = {};

  if (/hash/i.test(url)) {
    textResponse = hashResponse;
  } else if (/servico\/ServicoLogin\/login/.test(url)) {
    jsonResponse = loginResponse;
  } else if (/servico\/ServicoSaldo\/saldo/.test(url)) {
    jsonResponse = checkingBalance;
  } else if (/tela\/ExtratoDeContaCorrente\/extrato/.test(url)) {
    jsonResponse = checkingTransactions;
  } else if (/tela\/ExtratoDePoupanca\/entrada/.test(url)) {
    jsonResponse = savingsList;
  }

  return {
    text: () => Promise.resolve(textResponse),
    json: () => Promise.resolve(jsonResponse),
    headers: {
      get: () => {},
    },
  };
}
