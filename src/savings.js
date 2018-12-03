import fetch from 'node-fetch';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from './constants';

export default class BBSavings {
  loginToken = null;

  constructor(loginToken) {
    this.loginToken = loginToken;
  }

  async getAccounts() {
    const accountsUrl = 'tela/ExtratoDePoupanca/entrada';

    const response = await fetch(`${BASE_ENDPOINT}${accountsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
    });

    const json = await response.json();

    const sessions = json.conteiner.telas[0].sessoes[0];
    const title = sessions.cabecalho;
    const variations = sessions.celulas.map(c => c.acao.split('variacao=').splice(-1)[0]);

    return variations.map(v => ({
      variation: parseInt(v, 10),
      description: `${title} - Variação ${v}`,
    }));
  }
}
