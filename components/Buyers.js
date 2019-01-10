/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import t from 'tcomb-form-native';
import Output from './Output';
import Styles from '../styling/styles';


const Form = t.form.Form;
const options = {
  fields: {
    maxFHA: {
      label: 'Max FHA',
    },
    homePrice: {
      label: 'Home Price',
      placeholder: 'Required',
    },
    downPayment: {
      label: 'Down Payment',
    },
    interestRate: {
      label: 'Interest Rate',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
    },
    hoa: {
      label: 'HOA',
    },
    closingDate: {
      label: 'Closing Date',
    },
  },
};

const User = t.struct({
  maxFHA: t.String,
  homePrice: t.Number,
  downPayment: t.String,
  interestRate: t.String,
  term: t.String,
  misc: t.maybe(t.Number),
  hazardInsurance: t.String,
  taxes: t.String,
  hoa: t.maybe(t.Number),
  closingDate: t.maybe(t.Date),
});

const value = {
  maxFHA: '$350,750',
  downPayment: '3.5%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};


class Buyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      down: '',
      view: 'form',
      taxes: '',
      insurance: '',
      pAndL: '',
      prepaids: '',
      fixed: '',
      bringToClose: '',
    };
  }

  changeTaxes = (e) => { this.setState({ taxes: e }); };

  changeDown = (e) => { this.setState({ down: e }); };

  changeView = (e) => { this.setState({ view: e }); };

  changeInsurance = (e) => { this.setState({ insurance: e }); };

  changePAndI = (e) => { this.setState({ pAndL: e }); };

  changePrepaids = (e) => { this.setState({ prepaids: e }); };

  changeFixed = (e) => { this.setState({ fixed: e }); };

  bringToClose = (e) => { this.setState({ bringToClose: e }); }

  // DOWN PAYMENT CALCULATIONS
    calculateDownPayment = (home, down) => {
      const decimal = down.slice(0, -1);
      const percent = decimal / 100;
      const downPayment = Math.round(home * percent);
      const final = downPayment.toLocaleString();
      this.changeView('output');
      this.changeDown(final);
    }

    // WHERE ALL THE MATH IS DONE
    calculateAll = (home, down, taxes, insurance, interest, term) => {
      // TAXES
      const taxesDecimal = taxes.slice(0, -1);
      const taxesPercent = taxesDecimal / 100;
      const taxesDifference = home * taxesPercent;
      const tax = taxesDifference / 12;
      const finalTaxes = tax.toLocaleString();
      const finalRoundedTaxes = Math.round(finalTaxes * 100) / 100; // <===== TAX OUTPUT
      this.changeTaxes(finalRoundedTaxes);

      // INSURANCE
      const insuranceDecimal = insurance.slice(0, -1);
      const insurancePercent = insuranceDecimal / 100;
      const insuranceDifference = home * insurancePercent;
      const insure = insuranceDifference / 12;
      const final = insure.toLocaleString();
      const finalRoundedInsurance = Math.round(final * 100) / 100; // <==== INSURANCE OUTPUT
      this.changeInsurance(finalRoundedInsurance);

      // P AND I
      const PAndLDecimal = interest.slice(0, -1);
      const PAndLPercent = PAndLDecimal / 100;
      const PAndLInterest = PAndLPercent / 12;
      const PAndLMonthly = PAndLInterest * home;
      const PAndLTotal = PAndLMonthly + finalRoundedInsurance + finalRoundedTaxes;
      const PAndLTotalRounded = Math.round(PAndLTotal * 100) / 100;
      this.changePAndI(PAndLTotalRounded);

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
      this.changePrepaids(Prepaids);

      // FIXED
      // FIXED
      // FIXED
      // FIXED
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
        this.lenderTitlePolicyLeft(home, bringItBack);
      }
      if (home >= 510000 && home <= 1099999) {
        this.lenderTitlePolicyRight(home, bringItBack);
      }
      // FUNCTION FOR LENDER TITLE POLICY

      // FUNCTION FOR ESCROW
      const escrowBack = price => escrowFeeTotal = price;
      if (home >= 0 && home <= 509999) {
        this.escrowFeeLeft(home, escrowBack);
      }
      if (home >= 510000 && home <= 1099999) {
        this.escrowFeeRight(home, escrowBack);
      }

      const fixed = originatorFee + lenderTitlePolicy + escrowFeeTotal + 25 + 340 + 150 + 22 + 325 + 400 + 65 + 65 + 295 + 125 + 450 + 192 - proratedTaxCredit;
      const fixedRounded = Math.round(fixed * 100) / 100;
      this.changeFixed(fixedRounded);
      // FIXED
      // FIXED
      // FIXED
      // FIXED
      // FIXED
      // FIXED


      // bringToClose
      // bringToClose
      // bringToClose
      // bringToClose
      const downPaymentDecimal = down.slice(0, -1);
      const downPaymentPercent = downPaymentDecimal / 100;
      const downPaymentRound = Math.round(home * downPaymentPercent);
      const bringToClose = fixedRounded + Prepaids + downPaymentRound;
      const bringToCloseRounded = Math.round(bringToClose * 100) / 100;
      this.bringToClose(bringToCloseRounded);
    }


    // CALCULATION HELPER FUNCTIONS
    lenderTitlePolicyLeft = (num, callback) => {
      if (num <= 110000 && num >= 0) {
        callback(320);
      } else if (num >= 110000 && num < 120000) {
        callback(330);
      } else if (num >= 120000 && num < 130000) {
        callback(340);
      } else if (num >= 130000 && num < 140000) {
        callback(350);
      } else if (num >= 140000 && num < 150000) {
        callback(360);
      } else if (num >= 150000 && num < 160000) {
        callback(370);
      } else if (num >= 160000 && num < 170000) {
        callback(379);
      } else if (num >= 170000 && num < 180000) {
        callback(389);
      } else if (num >= 180000 && num < 190000) {
        callback(399);
      } else if (num >= 190000 && num < 200000) {
        callback(409);
      } else if (num >= 200000 && num < 210000) {
        callback(419);
      } else if (num >= 210000 && num < 220000) {
        callback(429);
      } else if (num >= 220000 && num < 230000) {
        callback(439);
      } else if (num >= 230000 && num < 240000) {
        callback(449);
      } else if (num >= 240000 && num < 250000) {
        callback(459);
      } else if (num >= 250000 && num < 260000) {
        callback(469);
      } else if (num >= 260000 && num < 270000) {
        callback(478);
      } else if (num >= 270000 && num < 280000) {
        callback(488);
      } else if (num >= 280000 && num < 290000) {
        callback(498);
      } else if (num >= 290000 && num < 300000) {
        callback(508);
      } else if (num >= 300000 && num < 310000) {
        callback(518);
      } else if (num >= 310000 && num < 320000) {
        callback(525);
      } else if (num >= 320000 && num < 330000) {
        callback(531);
      } else if (num >= 330000 && num < 340000) {
        callback(538);
      } else if (num >= 340000 && num < 350000) {
        callback(544);
      } else if (num >= 350000 && num < 360000) {
        callback(551);
      } else if (num >= 360000 && num < 370000) {
        callback(568);
      } else if (num >= 370000 && num < 380000) {
        callback(574);
      } else if (num >= 380000 && num < 390000) {
        callback(581);
      } else if (num >= 390000 && num < 400000) {
        callback(587);
      } else if (num >= 400000 && num < 410000) {
        callback(594);
      } else if (num >= 410000 && num < 420000) {
        callback(611);
      } else if (num >= 420000 && num < 430000) {
        callback(617);
      } else if (num >= 430000 && num < 440000) {
        callback(624);
      } else if (num >= 440000 && num < 450000) {
        callback(630);
      } else if (num >= 450000 && num < 460000) {
        callback(637);
      } else if (num >= 460000 && num < 470000) {
        callback(644);
      } else if (num >= 470000 && num < 480000) {
        callback(650);
      } else if (num >= 480000 && num < 490000) {
        callback(657);
      } else if (num >= 490000 && num < 500000) {
        callback(663);
      } else if (num >= 500000 && num < 510000) {
        callback(670);
      }
    }

    lenderTitlePolicyRight = (num, callback) => {
      if (num >= 510000 && num < 520000) {
        callback(712);
      } if (num >= 520000 && num < 530000) {
        callback(719);
      } else if (num >= 530000 && num < 540000) {
        callback(726);
      } else if (num >= 540000 && num < 550000) {
        callback(733);
      } else if (num >= 550000 && num < 560000) {
        callback(741);
      } else if (num >= 560000 && num < 570000) {
        callback(748);
      } else if (num >= 570000 && num < 580000) {
        callback(755);
      } else if (num >= 580000 && num < 590000) {
        callback(763);
      } else if (num >= 590000 && num < 600000) {
        callback(769);
      } else if (num >= 600000 && num < 610000) {
        callback(777);
      } else if (num >= 610000 && num < 620000) {
        callback(785);
      } else if (num >= 620000 && num < 630000) {
        callback(791);
      } else if (num >= 630000 && num < 640000) {
        callback(799);
      } else if (num >= 640000 && num < 650000) {
        callback(806);
      } else if (num >= 650000 && num < 660000) {
        callback(813);
      } else if (num >= 660000 && num < 670000) {
        callback(821);
      } else if (num >= 670000 && num < 680000) {
        callback(828);
      } else if (num >= 680000 && num < 690000) {
        callback(835);
      } else if (num >= 690000 && num < 700000) {
        callback(842);
      } else if (num >= 700000 && num < 710000) {
        callback(850);
      } else if (num >= 710000 && num < 720000) {
        callback(857);
      } else if (num >= 720000 && num < 730000) {
        callback(864);
      } else if (num >= 730000 && num < 740000) {
        callback(872);
      } else if (num >= 740000 && num < 750000) {
        callback(878);
      } else if (num >= 750000 && num < 760000) {
        callback(886);
      } else if (num >= 760000 && num < 770000) {
        callback(894);
      } else if (num >= 770000 && num < 780000) {
        callback(900);
      } else if (num >= 780000 && num < 790000) {
        callback(908);
      } else if (num >= 790000 && num < 800000) {
        callback(915);
      } else if (num >= 800000 && num < 810000) {
        callback(922);
      } else if (num >= 810000 && num < 820000) {
        callback(930);
      } else if (num >= 820000 && num < 830000) {
        callback(937);
      } else if (num >= 830000 && num < 840000) {
        callback(944);
      } else if (num >= 840000 && num < 850000) {
        callback(951);
      } else if (num >= 850000 && num < 860000) {
        callback(959);
      } else if (num >= 860000 && num < 870000) {
        callback(966);
      } else if (num >= 870000 && num < 880000) {
        callback(973);
      } else if (num >= 880000 && num < 890000) {
        callback(981);
      } else if (num >= 890000 && num < 900000) {
        callback(987);
      } else if (num >= 900000 && num < 910000) {
        callback(995);
      } else if (num >= 910000 && num < 920000) {
        callback(1003);
      } else if (num >= 920000 && num < 930000) {
        callback(1009);
      } else if (num >= 930000 && num < 940000) {
        callback(1017);
      } else if (num >= 940000 && num < 950000) {
        callback(1023);
      } else if (num >= 950000 && num < 960000) {
        callback(1031);
      } else if (num >= 960000 && num < 970000) {
        callback(1039);
      } else if (num >= 970000 && num < 980000) {
        callback(1045);
      } else if (num >= 980000 && num < 990000) {
        callback(1053);
      } else if (num >= 990000 && num < 1000000) {
        callback(1060);
      } else if (num >= 1000000 && num < 1100000) {
        callback(1067);
      }
    }

    escrowFeeLeft = (num, callback) => {
      if (num <= 110000 && num >= 0) {
        callback(875 * 0.4);
      } else if (num >= 110000 && num < 120000) {
        callback(885 * 0.4);
      } else if (num >= 120000 && num < 130000) {
        callback(895 * 0.4);
      } else if (num >= 130000 && num < 140000) {
        callback(905 * 0.4);
      } else if (num >= 140000 && num < 150000) {
        callback(915 * 0.4);
      } else if (num >= 150000 && num < 160000) {
        callback(925 * 0.4);
      } else if (num >= 160000 && num < 170000) {
        callback(935 * 0.4);
      } else if (num >= 170000 && num < 180000) {
        callback(945 * 0.4);
      } else if (num >= 180000 && num < 190000) {
        callback(955 * 0.4);
      } else if (num >= 190000 && num < 200000) {
        callback(965 * 0.4);
      } else if (num >= 200000 && num < 210000) {
        callback(975 * 0.4);
      } else if (num >= 210000 && num < 220000) {
        callback(985 * 0.4);
      } else if (num >= 220000 && num < 230000) {
        callback(995 * 0.4);
      } else if (num >= 230000 && num < 240000) {
        callback(1005 * 0.4);
      } else if (num >= 240000 && num < 250000) {
        callback(1015 * 0.4);
      } else if (num >= 250000 && num < 260000) {
        callback(1025 * 0.4);
      } else if (num >= 260000 && num < 270000) {
        callback(1035 * 0.4);
      } else if (num >= 270000 && num < 280000) {
        callback(1045 * 0.4);
      } else if (num >= 280000 && num < 290000) {
        callback(1055 * 0.4);
      } else if (num >= 290000 && num < 300000) {
        callback(1065 * 0.4);
      } else if (num >= 300000 && num < 310000) {
        callback(1075 * 0.4);
      } else if (num >= 310000 && num < 320000) {
        callback(1085 * 0.4);
      } else if (num >= 320000 && num < 330000) {
        callback(1095 * 0.4);
      } else if (num >= 330000 && num < 340000) {
        callback(1105 * 0.4);
      } else if (num >= 340000 && num < 350000) {
        callback(1115 * 0.4);
      } else if (num >= 350000 && num < 360000) {
        callback(1125 * 0.4);
      } else if (num >= 360000 && num < 370000) {
        callback(1135 * 0.4);
      } else if (num >= 370000 && num < 380000) {
        callback(1145 * 0.4);
      } else if (num >= 380000 && num < 390000) {
        callback(1155 * 0.4);
      } else if (num >= 390000 && num < 400000) {
        callback(1165 * 0.4);
      } else if (num >= 400000 && num < 410000) {
        callback(1175 * 0.4);
      } else if (num >= 410000 && num < 420000) {
        callback(1185 * 0.4);
      } else if (num >= 420000 && num < 430000) {
        callback(1195 * 0.4);
      } else if (num >= 430000 && num < 440000) {
        callback(1205 * 0.4);
      } else if (num >= 440000 && num < 450000) {
        callback(1215 * 0.4);
      } else if (num >= 450000 && num < 460000) {
        callback(1225 * 0.4);
      } else if (num >= 460000 && num < 470000) {
        callback(1235 * 0.4);
      } else if (num >= 470000 && num < 480000) {
        callback(1245 * 0.4);
      } else if (num >= 480000 && num < 490000) {
        callback(1255 * 0.4);
      } else if (num >= 490000 && num < 500000) {
        callback(1265 * 0.4);
      } else if (num >= 500000 && num < 510000) {
        callback(1275 * 0.4);
      }
    }

    escrowFeeRight = (num, callback) => {
      if (num >= 510000 && num < 520000) {
        callback(1285 * 0.4);
      } if (num >= 520000 && num < 530000) {
        callback(1295 * 0.4);
      } else if (num >= 530000 && num < 540000) {
        callback(1305 * 0.4);
      } else if (num >= 540000 && num < 550000) {
        callback(1315 * 0.4);
      } else if (num >= 550000 && num < 560000) {
        callback(1325 * 0.4);
      } else if (num >= 560000 && num < 570000) {
        callback(1335 * 0.4);
      } else if (num >= 570000 && num < 580000) {
        callback(1345 * 0.4);
      } else if (num >= 580000 && num < 590000) {
        callback(1355 * 0.4);
      } else if (num >= 590000 && num < 600000) {
        callback(1365 * 0.4);
      } else if (num >= 600000 && num < 610000) {
        callback(1375 * 0.4);
      } else if (num >= 610000 && num < 620000) {
        callback(1385 * 0.4);
      } else if (num >= 620000 && num < 630000) {
        callback(1395 * 0.4);
      } else if (num >= 630000 && num < 640000) {
        callback(1405 * 0.4);
      } else if (num >= 640000 && num < 650000) {
        callback(1415 * 0.4);
      } else if (num >= 650000 && num < 660000) {
        callback(1425 * 0.4);
      } else if (num >= 660000 && num < 670000) {
        callback(1435 * 0.4);
      } else if (num >= 670000 && num < 680000) {
        callback(1445 * 0.4);
      } else if (num >= 680000 && num < 690000) {
        callback(1455 * 0.4);
      } else if (num >= 690000 && num < 700000) {
        callback(1465 * 0.4);
      } else if (num >= 700000 && num < 710000) {
        callback(1475 * 0.4);
      } else if (num >= 710000 && num < 720000) {
        callback(1485 * 0.4);
      } else if (num >= 720000 && num < 730000) {
        callback(1495 * 0.4);
      } else if (num >= 730000 && num < 740000) {
        callback(1505 * 0.4);
      } else if (num >= 740000 && num < 750000) {
        callback(1515 * 0.4);
      } else if (num >= 750000 && num < 760000) {
        callback(1525 * 0.4);
      } else if (num >= 760000 && num < 770000) {
        callback(1535 * 0.4);
      } else if (num >= 770000 && num < 780000) {
        callback(1545 * 0.4);
      } else if (num >= 780000 && num < 790000) {
        callback(1555 * 0.4);
      } else if (num >= 790000 && num < 800000) {
        callback(1565 * 0.4);
      } else if (num >= 800000 && num < 810000) {
        callback(1575 * 0.4);
      } else if (num >= 810000 && num < 820000) {
        callback(1585 * 0.4);
      } else if (num >= 820000 && num < 830000) {
        callback(1595 * 0.4);
      } else if (num >= 830000 && num < 840000) {
        callback(1605 * 0.4);
      } else if (num >= 840000 && num < 850000) {
        callback(1615 * 0.4);
      } else if (num >= 850000 && num < 860000) {
        callback(1625 * 0.4);
      } else if (num >= 860000 && num < 870000) {
        callback(1635 * 0.4);
      } else if (num >= 870000 && num < 880000) {
        callback(1645 * 0.4);
      } else if (num >= 880000 && num < 890000) {
        callback(1655 * 0.4);
      } else if (num >= 890000 && num < 900000) {
        callback(1665 * 0.4);
      } else if (num >= 900000 && num < 910000) {
        callback(1675 * 0.4);
      } else if (num >= 910000 && num < 920000) {
        callback(1685 * 0.4);
      } else if (num >= 920000 && num < 930000) {
        callback(1695 * 0.4);
      } else if (num >= 930000 && num < 940000) {
        callback(1705 * 0.4);
      } else if (num >= 940000 && num < 950000) {
        callback(1715 * 0.4);
      } else if (num >= 950000 && num < 960000) {
        callback(1725 * 0.4);
      } else if (num >= 960000 && num < 970000) {
        callback(1735 * 0.4);
      } else if (num >= 970000 && num < 980000) {
        callback(1745 * 0.4);
      } else if (num >= 980000 && num < 990000) {
        callback(1755 * 0.4);
      } else if (num >= 990000 && num < 1000000) {
        callback(1765 * 0.4);
      } else if (num >= 1000000 && num < 1100000) {
        callback(1775 * 0.4);
      }
    }


    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      this.calculateDownPayment(value.homePrice,
        value.downPayment);
      this.calculateAll(value.homePrice,
        value.downPayment,
        value.taxes,
        value.hazardInsurance,
        value.interestRate,
        value.term);
    }


    renderView = () => {
      const { view } = this.state;
      if (view === 'form') {
        return (
          <ScrollView>
            <View style={Styles.styles.container}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
              }}
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
                />
              </View>

              <Form
                ref={c => this._form = c}
                type={User}
                options={options}
                value={value}
              />
              <View style={Styles.styles.button}>
                <Button
                  title="Calculate"
                  onPress={this.handleSubmit}
                  color="white"
                />
              </View>
            </View>
          </ScrollView>
        );
      }
      if (view === 'output') {
        const {
          down, taxes, insurance, pAndL, prepaids, fixed, bringToClose,
        } = this.state;
        return (
          <Output
            viewChange={this.changeView}
            down={down}
            taxes={taxes}
            insurance={insurance}
            pAndL={pAndL}
            prepaids={prepaids}
            fixed={fixed}
            bringToClose={bringToClose}
          />
        );
      }
    }

    render() {
      return (
        this.renderView()
      );
    }
}

export default Buyers;
