import fetch from 'node-fetch';
import querystring from 'querystring';
import LoginCookie from '../loginCookie';
import BBCardBill from './cardBill';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';

export default class BBCard {
  constructor({ brand, modality, cardAccountNumber, cardNumber }) {
    this.brand = brand;
    this.modality = modality;
    this.cardAccountNumber = cardAccountNumber;
    this.cardNumber = cardNumber;
  }

  async getBills() {
    const billsUrl = 'tela/ExtratoFatura/mesAnterior';

    const params = {
      codigoModalidade: this.modality,
      numeroContaCartao: this.cardAccountNumber,
      numeroPlastico: this.cardNumber,
    };

    const response = await fetch(`${BASE_ENDPOINT}${billsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: LoginCookie.getGlobal(),
      },
      method: 'POST',
      body: querystring.stringify(params),
    });

    const text = await response.text();
    const json = JSON.parse(text);

    const bills = json.conteiner.telas[0].sessoes[0].celulas
      .map(c =>
        c.protocolo.parametros
          .map(p => ({ [p[0]]: p[1] }))
          .reduce((acc, p) => ({ ...acc, ...p }), {}),
      )
      .map(
        p =>
          new BBCardBill({
            cardAccountNumber: this.cardAccountNumber,
            billId: p.sequencialFatura,
            billDate: p.dataFatura,
            status: 'closed',
          }),
      );

    const openedBillDate =
      bills[0].billDate.slice(0, 2) +
      (parseInt(bills[0].billDate.slice(2, 4), 10) + 1)
        .toString()
        .padStart(2, '0') +
      bills[0].billDate.slice(4, 8);

    bills.unshift(
      new BBCardBill({
        cardAccountNumber: bills[0].cardAccountNumber,
        billDate: openedBillDate,
        status: 'opened',
      }),
    );

    return bills;
  }
}
