/* eslint-disable no-undef */
// DOWN PAYMENT CALCULATIONS
import Helpers from './helpers';

calculateDownPayment = (home, downPay, callback) => {
  let down = '';
  const bringDownBack = (price => down = price);
  Helpers.funcs.changeToPercent(downPay, bringDownBack);
  console.log(down, 'down in calcs');
  const decimal = down.slice(0, -1);
  console.log(decimal, 'decimal in calcs');
  const percent = decimal / 100;
  const downPayment = Math.round(home * percent);
  // const final = downPayment.toLocaleString();
  callback('output', downPayment);
};

// WHERE ALL THE MATH IS DONE
calculateAll = (home, down, taxee, insuranceRa, interestRa, term, callback) => {
  // TAXES
  let taxes = '';
  const bringTaxBack = (price => taxes = price);
  Helpers.funcs.changeToPercent(taxee, bringTaxBack);
  const taxesDecimal = taxes.slice(0, -1);
  const taxesPercent = taxesDecimal / 100;
  const taxesDifference = home * taxesPercent;
  const tax = taxesDifference / 12;
  const finalTaxes = tax.toLocaleString();
  const finalRoundedTaxes = Math.round(finalTaxes * 100) / 100; // <===== TAX OUTPUT


  // MIP CALCULATION
  // principal * 0.008497 / 12
  const MIPdecimal = down.slice(0, -1);
  const MIPpercent = MIPdecimal / 100;
  const MIPdownPayment = MIPpercent * home;
  const MIPdownRound = Math.round(MIPdownPayment * 100) / 100;
  const MIPprincipal = home - MIPdownRound;
  const MIPrough = MIPprincipal * 0.008497 / 12;
  const MIPround = Math.round(MIPrough * 100) / 100;


  // INSURANCE
  let insurance = '';
  const bringInsuranceBack = (price => insurance = price);
  Helpers.funcs.changeToPercent(insuranceRa, bringInsuranceBack);
  const insuranceDecimal = insurance.slice(0, -1);
  const insurancePercent = insuranceDecimal / 100;
  const insuranceDifference = home * insurancePercent;
  const insure = insuranceDifference / 12;
  const final = insure.toLocaleString();
  const finalRoundedInsurance = Math.round(final * 100) / 100; // <==== INSURANCE OUTPUT


  // P AND I
  let interest = '';
  const bringInterestBack = (price => interest = price);
  Helpers.funcs.changeToPercent(interestRa, bringInterestBack);
  const PAndLDecimal = interest.slice(0, -1);
  const PAndLPercent = PAndLDecimal / 100;
  const PAndLInterest = PAndLPercent / 12;
  const PAndLMonthly = PAndLInterest * home;
  const PAndLTotal = PAndLMonthly + finalRoundedInsurance + finalRoundedTaxes;
  const PAndLTotalRounded = Math.round(PAndLTotal * 100) / 100;


  // PREPAIDS
  // BREAKS AROUND 1 MILLION!
  const prepaidInterestPerc = interest.slice(0, -1);
  const prepaidInterestDec = prepaidInterestPerc / 100;
  const prepaidDownpaymentPerc = down.slice(0, -1);
  const prepaidDownpaymentDec = prepaidDownpaymentPerc / 100;
  const prepaidDownpayment = Math.round((home * prepaidDownpaymentDec) * 100 / 100);
  const prepaidPrincipal = home - prepaidDownpayment;
  const prepaidNumberPayments = term * 12;
  const prepaidInterest = Math.round(((prepaidInterestDec / prepaidNumberPayments) * prepaidPrincipal) * 100) / 100;
  const prepaidInterestTotal = prepaidInterest * 30; // <========= INTEREST
  const prepaidTaxDec = taxes.slice(0, -1);
  const prepaidTaxPerc = prepaidTaxDec / 100;
  const prepaidTaxDiff = home * prepaidTaxPerc;
  const prepaidTaxTotal = prepaidTaxDiff / 12;
  const prepaidTaxStr = prepaidTaxTotal.toLocaleString();
  const prepaidTaxesFinal = Math.round(prepaidTaxStr * 100) / 100;
  const prepaidTaxesTotal = prepaidTaxesFinal * 2; // <========= TAXES
  const prepaidInsuranceDec = insurance.slice(0, -1);
  const prepaidInsurancePerc = prepaidInsuranceDec / 100;
  const prepaidDifference = home * prepaidInsurancePerc;
  const prepaidInsurance = prepaidDifference / 12;
  const prepaidFinal = prepaidInsurance.toLocaleString();
  const prepaidFinalRounded = Math.round(prepaidFinal * 100) / 100;
  const prepaidInsuranceTotal = prepaidFinalRounded * 14; // <====== INSURANCE
  const Prepaids = Math.round((prepaidInterestTotal + prepaidTaxesTotal + prepaidInsuranceTotal) * 100) / 100;


  // FIXED
  // FIXED
  // FIXED
  // FIXED
  const originatorFee = prepaidPrincipal * 0.01; // <===== ORIGINATOR FEE
  const proratedTaxCredit = Math.round((home * 0.0003081) * 100) / 100; // <====== PFC
  let lenderTitlePolicy = ''; // <========= LENDER TITLE POLICY
  let escrowFeeTotal = ''; // <========== // ESCROW FEE TOTAL

  // FUNCTION FOR LENDER TITLE POLICY
  const bringItBack = price => lenderTitlePolicy = price;
  if (home >= 0 && home <= 509999) {
    Helpers.funcs.lenderTitlePolicyLeft(home, bringItBack);
  }
  if (home >= 510000 && home <= 1099999) {
    Helpers.funcs.lenderTitlePolicyRight(home, bringItBack);
  }
  // FUNCTION FOR LENDER TITLE POLICY

  // FUNCTION FOR ESCROW
  const escrowBack = price => escrowFeeTotal = price;
  if (home >= 0 && home <= 509999) {
    Helpers.funcs.escrowFeeLeft(home, escrowBack);
  }
  if (home >= 510000 && home <= 1099999) {
    Helpers.funcs.escrowFeeRight(home, escrowBack);
  }

  const fixed = originatorFee + lenderTitlePolicy + escrowFeeTotal + 25 + 340 + 150 + 22 + 325 + 400 + 65 + 65 + 295 + 125 + 450 + 192 - proratedTaxCredit;
  const fixedRounded = Math.round(fixed * 100) / 100;
  // FIXED
  // FIXED
  // FIXED


  // bringToClose
  // bringToClose
  // bringToClose
  const downPaymentDecimal = down.slice(0, -1);
  const downPaymentPercent = downPaymentDecimal / 100;
  const downPaymentRound = Math.round(home * downPaymentPercent);
  const bringToClose = fixedRounded + Prepaids + downPaymentRound;
  const bringToCloseRounded = Math.round(bringToClose * 100) / 100;
  callback(finalRoundedTaxes, MIPround, finalRoundedInsurance, PAndLTotalRounded, Prepaids, fixedRounded, bringToCloseRounded, lenderTitlePolicy, escrowFeeTotal, originatorFee, proratedTaxCredit, prepaidInsuranceTotal, prepaidTaxesTotal, prepaidInterestTotal);
};


const funcs = {
  calculateDownPayment,
  calculateAll,
};

module.exports.funcs = funcs;
