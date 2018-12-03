import hashResponse from './data/hashResponse.json';
import loginResponse from './data/loginResponse.json';
import balanceResponse from './data/balanceResponse.json';
import checkingTransactions from './data/checkingTransactions.json';

export default function fetch(url) {
  let textResponse = '';
  let jsonResponse = {};

  if (/hash/i.test(url)) {
    textResponse = hashResponse;
  } else if (/servico\/ServicoLogin\/login/.test(url)) {
    jsonResponse = loginResponse;
  } else if (/servico\/ServicoSaldo\/saldo/.test(url)) {
    jsonResponse = balanceResponse;
  } else if (/tela\/ExtratoDeContaCorrente\/extrato/.test(url)) {
    jsonResponse = checkingTransactions;
  }

  return {
    text: () => Promise.resolve(textResponse),
    json: () => Promise.resolve(jsonResponse),
    headers: {
      get: () => {},
    },
  };
}
