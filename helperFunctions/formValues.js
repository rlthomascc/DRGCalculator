import t from 'tcomb-form-native';

const FHAoptions = {
  fields: {
    maxFHA: {
      label: 'Max FHA',
      returnKeyType: 'done',
    },
    homePrice: {
      label: 'Home Price',
      placeholder: 'Required',
      returnKeyType: 'done',
      // onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus();
    },
    downPayment: {
      label: 'Down Payment',
      returnKeyType: 'done',
    },
    interestRate: {
      label: 'Interest Rate',
      returnKeyType: 'done',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
      returnKeyType: 'done',
    },
    taxes: {
      returnKeyType: 'done',
    },
    term: {
      returnKeyType: 'done',
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
      returnKeyType: 'done',
    },
    downPayment: {
      label: 'Down Payment',
      returnKeyType: 'done',
    },
    interestRate: {
      label: 'Interest Rate',
      returnKeyType: 'done',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
      returnKeyType: 'done',
    },
    term: {
      returnKeyType: 'done',
    },
    taxes: {
      returnKeyType: 'done',
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
      returnKeyType: 'done',
    },
    homePrice: {
      label: 'Home Price',
      placeholder: 'Required',
      returnKeyType: 'done',
    },
    downPayment: {
      label: 'Down Payment',
      returnKeyType: 'done',
    },
    interestRate: {
      label: 'Interest Rate',
      returnKeyType: 'done',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
      returnKeyType: 'done',
    },
    term: {
      returnKeyType: 'done',
    },
    taxes: {
      returnKeyType: 'done',
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
      returnKeyType: 'done',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
      returnKeyType: 'done',
    },
    taxes: {
      returnKeyType: 'done',
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


// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES
// VALUES


const SanJoaquinConventionalvalue = {
  downPayment: '10.0%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

const SanJoaquinVAvalue = {
  maxVA: '$484,350',
  downPayment: '0.0%',
  interestRate: '4.75%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

const SanJoaquinFHAvalue = {
  maxFHA: '$425,500',
  downPayment: '3.5%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};

const SanJoaquinCashvalue = {
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
  SanJoaquinConventionalvalue,
  SanJoaquinVAvalue,
  SanJoaquinFHAvalue,
  SanJoaquinCashvalue,
};

module.exports.funcs = funcs;
