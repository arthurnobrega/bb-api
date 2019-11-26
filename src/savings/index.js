import fetch from 'node-fetch';
import LoginCookie from '../loginCookie';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';
import BBSavingsAccount from './savingsAccount';

export default class BBSavings {
  async getAccounts() {
    const accountsUrl = 'tela/ExtratoDePoupanca/entrada';

    const response = await fetch(`${BASE_ENDPOINT}${accountsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: LoginCookie.getGlobal(),
      },
    });

    const text = await response.text();
    const json = JSON.parse(text);

    const sessions = json.conteiner.telas[0].sessoes[0];
    const title = sessions.cabecalho;
    const variations = sessions.celulas.map(
      c => c.acao.split('variacao=').splice(-1)[0],
    );

    return variations.map(
      v =>
        new BBSavingsAccount({
          variation: parseInt(v, 10),
          description: `${title} - Variação ${v}`,
        }),
    );
  }
}
