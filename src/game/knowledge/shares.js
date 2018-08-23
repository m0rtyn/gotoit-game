export const shares = {
  share0: {
    name: 'Future Sight',
    short: 'FS',
    onBuy: (data, value) => {
      if (data.money >= value) {
        data.helpers.chargeMoney(value);
        data.share0 += value / data.current_share0_price;
      }
    },
    onSell: (data, value) => {
      let cost = value / data.current_share0_price;
      if (data.share0 >= cost) {
        data.share0 -= cost;
        data.helpers.addMoney(value);
      }
    }
  },
  share1: {
    name: 'L-Ri',
    short: 'LR',
    onBuy: (data, value) => {
      if (data.money >= value) {
        data.helpers.chargeMoney(value);
        data.share1 += value / data.current_share1_price;
      }
    },
    onSell: (data, value) => {
      let cost = value / data.current_share1_price;
      if (data.share1 >= cost) {
        data.share1 -= cost;
        data.helpers.addMoney(value);
      }
    }
  },
  share2: {
    name: 'Murum',
    short: 'MRM',
    onBuy: (data, value) => {
      if (data.money >= value) {
        data.helpers.chargeMoney(value);
        data.share2 += value / data.current_share2_price;
      }
    },
    onSell: (data, value) => {
      let cost = value / data.current_share2_price;
      if (data.share2 >= cost) {
        data.share2 -= cost;
        data.helpers.addMoney(value);
      }
    }
  },
  btc: {
    name: 'Bitcoin',
    short: 'BTC',
    onBuy: (data, value) => {
      if (data.money >= value) {
        data.helpers.chargeMoney(value);
        data.btc += value / data.current_btc_price;
      }
    },
    onSell: (data, value) => {
      let cost = value / data.current_btc_price;
      if (data.btc >= cost) {
        data.btc -= cost;
        data.helpers.addMoney(value);
      }
    }
  }
};
