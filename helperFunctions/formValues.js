import t from 'tcomb-form-native';

const FHAoptions = {
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
    // hoa: {
    //   label: 'HOA',
    // },
    // closingDate: {
    //   label: 'Closing Date',
    // },
  },
};

const FHA = t.struct({
  maxFHA: t.String,
  homePrice: t.Number,
  downPayment: t.String,
  interestRate: t.String,
  term: t.String,
  // misc: t.maybe(t.Number),
  hazardInsurance: t.String,
  taxes: t.String,
  // hoa: t.maybe(t.Number),
  // closingDate: t.maybe(t.Date),
});

const FHAvalue = {
  maxFHA: '$350,750',
  downPayment: '3.5%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

// CONVENTIONAL
// CONVENTIONAL
// CONVENTIONSL
// CONVENTIONAL
// CONVENTIONAL

const Conventionaloptions = {
  fields: {
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
    // hoa: {
    //   label: 'HOA',
    // },
    // closingDate: {
    //   label: 'Closing Date',
    // },
  },
};

const Conventional = t.struct({
  homePrice: t.Number,
  downPayment: t.String,
  interestRate: t.String,
  term: t.String,
  // misc: t.maybe(t.Number),
  hazardInsurance: t.String,
  taxes: t.String,
  // hoa: t.maybe(t.Number),
  // closingDate: t.maybe(t.Date),
});

const Conventionalvalue = {
  downPayment: '10.0%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

// VA
// VA
// VA
// VA
// VA
// VA
// VA
// VA

const VAoptions = {
  fields: {
    maxVA: {
      label: 'Max VA',
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
    // hoa: {
    //   label: 'HOA',
    // },
    // closingDate: {
    //   label: 'Closing Date',
    // },
  },
};

const VA = t.struct({
  maxVA: t.String,
  homePrice: t.Number,
  downPayment: t.String,
  interestRate: t.String,
  term: t.String,
  // misc: t.maybe(t.Number),
  hazardInsurance: t.String,
  taxes: t.String,
  // hoa: t.maybe(t.Number),
  // closingDate: t.maybe(t.Date),
});

const VAvalue = {
  maxVA: '$484,350',
  downPayment: '0.0%',
  interestRate: '4.75%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

// CASH
// CASH
// CASH
// CASH
// CASH
// CASH
// CASH
// CASH
// CASH
// CASH

const Cashoptions = {
  fields: {
    homePrice: {
      label: 'Home Price',
      placeholder: 'Required',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
    },
  },
};

const Cash = t.struct({
  homePrice: t.Number,
  hazardInsurance: t.String,
  taxes: t.String,
});

const Cashvalue = {
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

const funcs = {
  FHAoptions,
  FHA,
  FHAvalue,
  Conventional,
  Conventionalvalue,
  Conventionaloptions,
  VAoptions,
  VA,
  VAvalue,
  Cash,
  Cashvalue,
  Cashoptions,
};

module.exports.funcs = funcs;
