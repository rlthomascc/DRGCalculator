const Helpers = require('../helperFunctions/helpers');

calculateAll = (home, broker, taxes, interest, callback) => {
  const brokerPercent = broker.slice(0, -1);
  const brokerDecimal = brokerPercent / 100;
  const brokerFee = home * brokerDecimal / 2; // <====== BROKER FEE 6% / 2
  const salesPrice = home; // <===== SALES PRICE
  const balance = home - home; // <==== BALANCE
  let escrowFee = '';
  const ownersTitlePolicy = 0;// 'FIGURE ME OUT';
  const countyTransferTax = 0;// 'FIGURE ME OUT';

  const escrowBack = price => escrowFee = price;
  if (home >= 0 && home <= 509999) {
    Helpers.funcs.escrowFeeLeft(home, escrowBack);
  }
  if (home >= 510000 && home <= 1099999) {
    Helpers.funcs.escrowFeeRight(home, escrowBack);
  }

  const netAtClose = home - brokerFee - brokerFee - ownersTitlePolicy - escrowFee - 99 - 150 - countyTransferTax - 70 - 95;
  const closingCosts = ownersTitlePolicy + escrowFee + 99 + 150 + countyTransferTax + 70 + 95 + brokerFee + brokerFee;


  console.log(netAtClose);
  callback(broker, salesPrice, balance, escrowFee, ownersTitlePolicy, countyTransferTax, netAtClose, closingCosts);
};


const funcs = { calculateAll };
module.exports.funcs = funcs;
