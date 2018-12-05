import fetch from 'node-fetch';
import querystring from 'querystring';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';

export default class BBCardBill {
  constructor({ cardAccountNumber, billId, billDate }) {
    this.cardAccountNumber = cardAccountNumber;
    this.billId = billId;
    this.billDate = billDate;
  }

  async getTransactions() {
    const transactionsUrl = 'tela/ExtratoFatura/extrato';

    const params = {
      numeroContaCartao: this.cardAccountNumber,
      sequencialFatura: this.billId,
      dataFatura: this.billDate,
      tipoExtrato: 'F',
    };

    const response = await fetch(`${BASE_ENDPOINT}${transactionsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    });

    const text = await response.text();
    const json = JSON.parse(text);

    return json.conteiner.telas[0].sessoes[0].celulas
      .map(c => c.protocolo.parametros.filter(p => p[0] === 'dataFatura'))
      .map(p => p[0][1]);
  }
}
