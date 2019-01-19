import Helpers from './helpers';


calculateAll = (home, downPay, callback) => {
  let down = '';
  const bringDownBack = (price => down = price);
  Helpers.funcs.changeToPercent(downPay, bringDownBack);
  const downPercentage = down.slice(0, -1);
  const downDecimal = downPercentage / 100;
  const downPayment = home * downDecimal;
  const principal = home - downPayment;
  let lenderChart = '';
  if (downPercentage >= 0 && downPercentage < 5) {
    lenderChart = 1.55 / 100;
  } else if (downPercentage >= 5 && downPercentage < 10) {
    lenderChart = 0.9400 / 100;
  } else if (downPercentage >= 10 && downPercentage < 15) {
    lenderChart = 0.62 / 100;
  } else if (downPercentage >= 15 && downPercentage < 20) {
    lenderChart = 0.38 / 100;
  }
  const totalPMI = principal * lenderChart;
  const monthlyPMI = totalPMI / 12;
  callback(monthlyPMI);
};


const funcs = { calculateAll };
module.exports.funcs = funcs;
