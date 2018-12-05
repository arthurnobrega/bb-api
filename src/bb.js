import fetch from 'node-fetch';
import querystring from 'querystring';
import LoginCookie from './loginCookie';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from './constants';
import BBChecking from './checking';
import BBSavings from './savings';
import BBCreditCard from './creditCard';

const refreshHash = async () => {
  const hashUrl = 'hash';
  const params = { id: '00000000000000000000000000000000' };

  const response = await fetch(`${BASE_ENDPOINT}${hashUrl}`, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: querystring.stringify(params),
  });

  const hash = await response.text();

  return hash;
};

export default class BB {
  checking = null;

  savings = null;

  creditCard = null;

  async login({ branch, account, password }) {
    const loginUrl = 'servico/ServicoLogin/login';
    const hash = await refreshHash();

    const params = {
      idh: hash,
      dependenciaOrigem: branch,
      numeroContratoOrigem: account,
      senhaConta: password,
      titularidade: '1',
    };

    const response = await fetch(`${BASE_ENDPOINT}${loginUrl}`, {
      headers: DEFAULT_HEADERS,
      method: 'POST',
      body: querystring.stringify(params),
    });

    LoginCookie.setGlobal(response.headers.get('set-cookie'));

    const text = await response.text();
    const { login } = JSON.parse(text);

    this.checking = new BBChecking();
    this.savings = new BBSavings();
    this.creditCard = new BBCreditCard();

    return login;
  }
}
