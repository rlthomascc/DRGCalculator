const Helpers = require('../helperFunctions/helpers');

calculateAll = (home, brokerPrice, taxes, interest, callback) => {
  let broker = '';
  const bringBrokerBack = (price => broker = price);
  Helpers.funcs.changeToPercent(brokerPrice, bringBrokerBack);
  const brokerPercent = broker.slice(0, -1);
  const brokerDecimal = brokerPercent / 100;
  const brokerFee = home * brokerDecimal / 2; // <====== BROKER FEE 6% / 2
  const salesPrice = home; // <===== SALES PRICE
  const balance = home - home; // <==== BALANCE
  let escrowFee = '';
  let ownersTitlePolicy = '';
  const countyTransferTax = 0;// 'FIGURE ME OUT';

  const escrowBack = price => escrowFee = price;
  if (home >= 0 && home <= 509999) {
    Helpers.funcs.escrowFeeLeft(home, escrowBack);
  }
  if (home >= 510000 && home <= 1099999) {
    Helpers.funcs.escrowFeeRight(home, escrowBack);
  }

  const ownersTitlePolicyBack = price => ownersTitlePolicy = price;
  if (home >= 0 && home < 510000) {
    Helpers.funcs.ownersTitlePolicyLeft(home, ownersTitlePolicyBack);
  }
  if (home >= 51000 && home < 1100000) {
    Helpers.funcs.ownersTitlePolicyRight(home, ownersTitlePolicyBack);
  }


  const netAtClose = home - brokerFee - brokerFee - ownersTitlePolicy - escrowFee - 99 - 150 - countyTransferTax - 70 - 95;
  const closingCosts = ownersTitlePolicy + escrowFee + 99 + 150 + countyTransferTax + 70 + 95 + brokerFee + brokerFee;


  callback(brokerFee, salesPrice, balance, escrowFee, ownersTitlePolicy, countyTransferTax, netAtClose, closingCosts);
};


const funcs = { calculateAll };
module.exports.funcs = funcs;
